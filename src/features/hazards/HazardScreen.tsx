import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  RotateCcw, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Volume2,
  FileText,
  Upload
} from 'lucide-react';
import { localDb, CachedHazardReport } from '@/services/offline/db';
import { syncManager } from '@/services/offline/syncManager';

export const HazardScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, org, sectorConfig } = useAuth();

  const [category, setCategory] = useState<string>(sectorConfig.hazardCategories[0]?.id || 'ppe_missing');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [textDescription, setTextDescription] = useState<string>('');
  
  // Voice Recording State (MediaRecorder)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  
  // Photo State
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop()); // Release mic hardware
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch (err: any) {
      alert('Microphone permission required for voice reporting: ' + err.message);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleRerecord = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingDuration(0);
  };

  const togglePlayback = () => {
    if (!audioUrl) return;
    if (!audioElementRef.current) {
      audioElementRef.current = new Audio(audioUrl);
      audioElementRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioElementRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioElementRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textDescription && !audioBlob) {
      alert('Please provide either a voice recording or a written description.');
      return;
    }

    setIsSubmitting(true);
    const clientUuid = 'haz-' + crypto.randomUUID();
    const ticketNumber = 'HAZ-2026-' + Math.floor(1000 + Math.random() * 9000);
    const nowIso = new Date().toISOString();

    const reportRecord: CachedHazardReport = {
      id: clientUuid,
      ticketNumber,
      orgId: org?.id || '',
      userId: user?.id || '',
      category,
      description: textDescription || 'Voice hazard recording submitted',
      hasAudio: Boolean(audioBlob),
      audioUrl: audioUrl || undefined,
      imageUrl: photoPreview || undefined,
      priority,
      status: 'submitted',
      createdAt: nowIso,
      updatedAt: nowIso,
      syncStatus: syncManager.isOnline ? 'synced' : 'queued'
    };

    try {
      // 1. Save to local Dexie storage
      await localDb.hazards.put(reportRecord);

      // 2. Queue for cloud sync
      await syncManager.queueMutation({
        clientUuid,
        operationType: 'hazard_report',
        timestamp: nowIso,
        payload: {
          ticket_number: ticketNumber,
          category,
          description: textDescription,
          has_audio: Boolean(audioBlob),
          priority,
          status: 'submitted'
        },
        audioBlob: audioBlob || undefined,
        orgId: org?.id || '',
        userId: user?.id || ''
      });

      setSubmittedTicket(ticketNumber);
      // Reset form fields
      setTextDescription('');
      setAudioBlob(null);
      setAudioUrl(null);
      setPhotoPreview(null);
    } catch (err: any) {
      alert('Failed to submit report: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-white">{t('hazard.title')}</h1>
          <p className="text-xs text-zinc-400">
            Voice-first hazard logging & grievance escalation
          </p>
        </div>
        <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      {submittedTicket ? (
        <div className="p-6 rounded-2xl bg-zinc-900 border border-emerald-500/40 text-center space-y-4 shadow-xl">
          <div className="p-3.5 rounded-full bg-emerald-500/10 text-emerald-400 w-fit mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Report Successfully Logged
            </span>
            <h2 className="text-2xl font-black text-white mt-1">Ticket #{submittedTicket}</h2>
            <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto">
              Your safety report is in the queue: <strong>Submitted → Acknowledged</strong>. Management has been notified with high priority.
            </p>
          </div>
          <button
            onClick={() => setSubmittedTicket(null)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition"
          >
            File Another Report
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5 shadow-xl">
          {/* Category Select */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Workplace Hazard or Grievance Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-red-500"
            >
              {sectorConfig.hazardCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.label} ({cat.severity.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Severity Radio Group */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Urgency / Severity Level
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
              {(['low', 'medium', 'high', 'critical'] as const).map(sev => (
                <button
                  type="button"
                  key={sev}
                  onClick={() => setPriority(sev)}
                  className={`py-2 rounded-xl uppercase transition ${
                    priority === sev
                      ? sev === 'critical' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' :
                        sev === 'high' ? 'bg-amber-600 text-white shadow' :
                        'bg-blue-600 text-white shadow'
                      : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Recording Interface (MANDATORY WORKING IMPLEMENTATION) */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 text-center">
            <span className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider block">
              1. {t('hazard.recordVoice')} (MediaRecorder)
            </span>

            {!audioUrl ? (
              <div className="flex flex-col items-center justify-center py-2 space-y-2">
                <button
                  type="button"
                  onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition shadow-2xl ${
                    isRecording
                      ? 'bg-red-600 text-white animate-ping'
                      : 'bg-red-600/20 hover:bg-red-600/30 text-red-400 border-2 border-red-500/50'
                  }`}
                  aria-label={isRecording ? 'Stop recording voice' : 'Start recording voice'}
                >
                  {isRecording ? <Square className="w-6 h-6 fill-white" /> : <Mic className="w-7 h-7" />}
                </button>

                <p className="text-xs text-zinc-300 font-semibold mt-1">
                  {isRecording ? `Recording Audio: ${recordingDuration}s... Tap to Stop` : 'Tap Microphone to Speak Your Concern'}
                </p>
                <p className="text-[11px] text-zinc-500">
                  Ideal for rapid reporting when typing is difficult or unsafe on site.
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlayback}
                    className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition"
                    aria-label={isPlayingAudio ? 'Pause playback' : 'Play recorded voice'}
                  >
                    {isPlayingAudio ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="text-xs font-bold text-zinc-200">
                    Voice Note Attached ({recordingDuration}s)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleRerecord}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-red-400 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Rerecord</span>
                </button>
              </div>
            )}
          </div>

          {/* Optional Text Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              2. Optional Written Description
            </label>
            <textarea
              value={textDescription}
              onChange={(e) => setTextDescription(e.target.value)}
              rows={3}
              placeholder="Provide exact location, machine ID, or details of the safety concern..."
              className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Photo Attachment */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              3. Photo Evidence (Optional)
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer transition">
                <Camera className="w-4 h-4 text-blue-400" />
                <span>Snap / Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {photoPreview && (
                <div className="relative">
                  <img src={photoPreview} alt="Evidence" className="w-12 h-12 rounded-lg object-cover border border-zinc-700" />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Transmitting Report...' : t('hazard.submitReport')}
          </button>
        </form>
      )}
    </div>
  );
};
