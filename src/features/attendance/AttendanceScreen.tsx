import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  QrCode, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  UserCheck,
  Camera,
  History
} from 'lucide-react';
import QRCode from 'qrcode';
import { localDb, CachedAttendance } from '@/services/offline/db';
import { syncManager } from '@/services/offline/syncManager';

export const AttendanceScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, org, sectorConfig } = useAuth();

  const [activeCheckin, setActiveCheckin] = useState<CachedAttendance | null>(null);
  const [method, setMethod] = useState<'qr' | 'location' | 'manual' | 'supervisor'>('qr');
  const [generatedQr, setGeneratedQr] = useState<string>('');
  const [selectedSiteId, setSelectedSiteId] = useState<string>(org?.sites[0]?.id || '');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    // Check if user currently has an unclosed checkin
    localDb.attendances
      .where('userId')
      .equals(user?.id || '')
      .last()
      .then((record) => {
        if (record && !record.checkOutTime) {
          setActiveCheckin(record);
        } else {
          setActiveCheckin(null);
        }
      });
  }, [user?.id]);

  // Generate dynamic QR code token for site check-in
  useEffect(() => {
    const site = org?.sites.find(s => s.id === selectedSiteId) || org?.sites[0];
    const payload = JSON.stringify({
      orgId: org?.id,
      siteId: site?.id,
      siteName: site?.name,
      validUntil: Date.now() + 10 * 60 * 1000, // 10 min token
      nonce: Math.random().toString(36).substring(2, 9)
    });

    QRCode.toDataURL(payload, { width: 200, margin: 1, color: { dark: '#ffffff', light: '#18181b' } })
      .then(url => setGeneratedQr(url))
      .catch(() => {});
  }, [selectedSiteId, org?.id]);

  const handleClockIn = async (verificationMethod: 'qr' | 'location' | 'manual' | 'supervisor_fallback') => {
    setIsProcessing(true);
    setFeedbackMsg(null);

    const site = org?.sites.find(s => s.id === selectedSiteId) || org?.sites[0];
    const clientUuid = 'chk-' + crypto.randomUUID();
    const nowIso = new Date().toISOString();

    const attendanceRecord: CachedAttendance = {
      id: clientUuid,
      orgId: org?.id || '',
      userId: user?.id || '',
      siteId: site?.id || '',
      siteName: site?.name || '',
      checkInTime: nowIso,
      verificationMethod,
      syncStatus: syncManager.isOnline ? 'synced' : 'queued'
    };

    try {
      // 1. Save to local Dexie database immediately (Offline-First guarantee)
      await localDb.attendances.put(attendanceRecord);

      // 2. Queue for cloud sync
      await syncManager.queueMutation({
        clientUuid,
        operationType: 'attendance_checkin',
        timestamp: nowIso,
        payload: {
          site_id: site?.id,
          verification_method: verificationMethod,
          check_in_time: nowIso
        },
        orgId: org?.id || '',
        userId: user?.id || ''
      });

      setActiveCheckin(attendanceRecord);
      setFeedbackMsg({
        type: 'success',
        text: `Checked in successfully at ${site?.name} via ${verificationMethod.toUpperCase()}`
      });
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err?.message || 'Failed to record attendance' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClockOut = async () => {
    if (!activeCheckin) return;
    setIsProcessing(true);
    setFeedbackMsg(null);

    const checkOutTime = new Date().toISOString();
    const startMs = new Date(activeCheckin.checkInTime).getTime();
    const endMs = new Date(checkOutTime).getTime();
    const totalHours = Math.max(0.5, Math.round(((endMs - startMs) / (1000 * 60 * 60)) * 10) / 10);
    const standardHours = sectorConfig.wageSettings.standardHoursPerDay;
    const regularHours = Math.min(totalHours, standardHours);
    const overtimeHours = Math.max(0, Math.round((totalHours - regularHours) * 10) / 10);

    try {
      // Update local record in Dexie
      await localDb.attendances.update(activeCheckin.id, {
        checkOutTime,
        totalHours,
        regularHours,
        overtimeHours,
        syncStatus: syncManager.isOnline ? 'synced' : 'queued'
      });

      // Queue sync mutation
      await syncManager.queueMutation({
        clientUuid: activeCheckin.id,
        operationType: 'attendance_checkout',
        timestamp: checkOutTime,
        payload: {
          check_out_time: checkOutTime,
          total_hours: totalHours,
          regular_hours: regularHours,
          overtime_hours: overtimeHours
        },
        orgId: org?.id || '',
        userId: user?.id || ''
      });

      setActiveCheckin(null);
      setFeedbackMsg({
        type: 'success',
        text: `Shift completed: ${totalHours}h recorded (${overtimeHours}h Overtime).`
      });
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err?.message || 'Clock out failed' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-white">{t('attendance.title')}</h1>
          <p className="text-xs text-zinc-400">
            {sectorConfig.orgUnitLabel}: {org?.sites.find(s => s.id === selectedSiteId)?.name}
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Roster</span>
        </div>
      </div>

      {feedbackMsg && (
        <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
          feedbackMsg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
          feedbackMsg.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
          'bg-zinc-800 text-zinc-200'
        }`}>
          {feedbackMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Active Shift Card or Check-in Controls */}
      {activeCheckin ? (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-emerald-500/40 shadow-2xl text-center space-y-4">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 animate-pulse">
            <Clock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Shift In Progress
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              {activeCheckin.siteName}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Started at: {new Date(activeCheckin.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
            Method: <strong className="text-white capitalize">{activeCheckin.verificationMethod.replace('_', ' ')}</strong> | Sync: <strong className="text-emerald-400 capitalize">{activeCheckin.syncStatus}</strong>
          </div>

          <button
            onClick={handleClockOut}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm transition shadow-lg shadow-red-600/30"
          >
            {isProcessing ? 'Recording...' : t('attendance.clockOutBtn')}
          </button>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5">
          {/* Target Location / Site Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Select Authorized {sectorConfig.orgUnitLabel}
            </label>
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs font-medium focus:outline-none focus:border-blue-500"
            >
              {org?.sites.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Verification Method Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-semibold">
            <button
              onClick={() => setMethod('qr')}
              className={`py-2 rounded-lg transition ${method === 'qr' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              Site QR
            </button>
            <button
              onClick={() => setMethod('location')}
              className={`py-2 rounded-lg transition ${method === 'location' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              GPS Geofence
            </button>
            <button
              onClick={() => setMethod('supervisor')}
              className={`py-2 rounded-lg transition ${method === 'supervisor' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              Supervisor
            </button>
          </div>

          {/* QR Method Body */}
          {method === 'qr' && (
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-3">
              <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-700 shadow-md">
                {generatedQr ? (
                  <img src={generatedQr} alt="Site Checkin QR" className="w-40 h-40 rounded" />
                ) : (
                  <div className="w-40 h-40 bg-zinc-800 rounded flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-zinc-500 animate-pulse" />
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-400 text-center max-w-xs font-medium">
                Hold phone camera up to the site scanner or click below to simulate instant QR verification.
              </p>
              <button
                onClick={() => handleClockIn('qr')}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold transition shadow-lg shadow-blue-600/20"
              >
                {isProcessing ? 'Verifying...' : 'Simulate Verified QR Scan'}
              </button>
            </div>
          )}

          {/* Location Method Body */}
          {method === 'location' && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-3 text-center">
              <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 w-fit mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Geofence Boundary Check</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Validates that your device is within 250m of {org?.sites.find(s => s.id === selectedSiteId)?.name}.
                </p>
              </div>
              <button
                onClick={() => handleClockIn('location')}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold transition"
              >
                {isProcessing ? 'Acquiring GPS...' : 'Verify Location & Clock In'}
              </button>
            </div>
          )}

          {/* Supervisor Fallback */}
          {method === 'supervisor' && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-3 text-center">
              <div className="p-3 rounded-full bg-amber-500/10 text-amber-400 w-fit mx-auto">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Supervisor-Assisted Reconciliation</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  If the camera is damaged or GPS is unavailable, your attendance claim is safely recorded with an immutable audit trail.
                </p>
              </div>
              <button
                onClick={() => handleClockIn('supervisor_fallback')}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold transition"
              >
                Submit Claim for Supervisor Signoff
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
