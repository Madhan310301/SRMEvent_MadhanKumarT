import Dexie, { type EntityTable } from 'dexie';

export interface QueuedMutation {
  id?: number;
  clientUuid: string;
  operationType: 'attendance_checkin' | 'attendance_checkout' | 'hazard_report' | 'anonymous_feedback' | 'fatigue_appeal';
  timestamp: string;
  payload: any;
  audioBlob?: Blob;
  retryCount: number;
  syncStatus: 'queued' | 'syncing' | 'synced' | 'failed';
  errorMessage?: string;
  orgId: string;
  userId: string;
}

export interface CachedAttendance {
  id: string; // clientUuid
  orgId: string;
  userId: string;
  siteId: string;
  siteName: string;
  checkInTime: string;
  checkOutTime?: string;
  verificationMethod: 'qr' | 'location' | 'manual' | 'supervisor_fallback';
  syncStatus: 'synced' | 'queued';
  totalHours?: number;
  regularHours?: number;
  overtimeHours?: number;
}

export interface CachedHazardReport {
  id: string;
  ticketNumber: string;
  orgId: string;
  userId: string;
  category: string;
  description: string;
  hasAudio: boolean;
  audioUrl?: string;
  imageUrl?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'submitted' | 'acknowledged' | 'investigating' | 'action_taken' | 'resolved' | 'employee_confirmed';
  employerResponse?: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: 'synced' | 'queued';
}

export interface CachedFeedbackRecovery {
  threadId: string;
  recoveryToken: string; // plain-text token stored ONLY locally on the worker's device
  category: string;
  initialMessageSnippet: string;
  createdAt: string;
  lastCheckedAt: string;
}

export class FairShiftDatabase extends Dexie {
  mutations!: EntityTable<QueuedMutation, 'id'>;
  attendances!: EntityTable<CachedAttendance, 'id'>;
  hazards!: EntityTable<CachedHazardReport, 'id'>;
  feedbackTokens!: EntityTable<CachedFeedbackRecovery, 'threadId'>;

  constructor() {
    super('FairShiftLocalDB');
    this.version(1).stores({
      mutations: '++id, clientUuid, operationType, syncStatus, orgId, userId',
      attendances: 'id, orgId, userId, checkInTime, syncStatus',
      hazards: 'id, ticketNumber, orgId, userId, status, syncStatus',
      feedbackTokens: 'threadId, createdAt'
    });
  }
}

export const localDb = new FairShiftDatabase();
export const db = localDb;
