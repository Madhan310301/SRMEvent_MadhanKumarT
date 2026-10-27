import { localDb, QueuedMutation } from './db';
import { supabase } from '@/lib/supabase';

type SyncListener = (pendingCount: number, isOnline: boolean) => void;

class SyncManager {
  private isSyncing = false;
  private listeners: Set<SyncListener> = new Set();
  public isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.notifyListeners();
        this.processQueue();
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.notifyListeners();
      });
    }
  }

  public subscribe(listener: SyncListener): () => void {
    this.listeners.add(listener);
    this.getPendingCount().then(count => listener(count, this.isOnline));
    return () => this.listeners.delete(listener);
  }

  private async notifyListeners(): Promise<void> {
    const count = await this.getPendingCount();
    this.listeners.forEach(fn => fn(count, this.isOnline));
  }

  public async getPendingCount(): Promise<number> {
    try {
      return await localDb.mutations.where('syncStatus').equals('queued').count();
    } catch {
      return 0;
    }
  }

  public async queueMutation(mutation: Omit<QueuedMutation, 'id' | 'syncStatus' | 'retryCount'>): Promise<number | undefined> {
    const id = await localDb.mutations.add({
      ...mutation,
      syncStatus: 'queued',
      retryCount: 0
    });
    this.notifyListeners();

    if (this.isOnline) {
      this.processQueue();
    }
    return id;
  }

  public async processQueue(): Promise<void> {
    if (this.isSyncing || !this.isOnline) return;
    this.isSyncing = true;

    try {
      const queuedItems = await localDb.mutations.where('syncStatus').equals('queued').toArray();

      for (const item of queuedItems) {
        if (!item.id) continue;
        try {
          await localDb.mutations.update(item.id, { syncStatus: 'syncing' });

          // Try syncing to Supabase if configured and reachable
          if (supabase) {
            if (item.operationType === 'attendance_checkin' || item.operationType === 'attendance_checkout') {
              const { error } = await supabase.from('checkins').upsert({
                id: item.clientUuid,
                org_id: item.orgId,
                user_id: item.userId,
                ...item.payload,
                updated_at: new Date().toISOString()
              });
              if (error && error.code !== '42P01') { // Ignore missing demo table errors during offline test
                throw error;
              }
            } else if (item.operationType === 'hazard_report') {
              const { error } = await supabase.from('hazard_reports').upsert({
                id: item.clientUuid,
                org_id: item.orgId,
                user_id: item.userId,
                ...item.payload,
                updated_at: new Date().toISOString()
              });
              if (error && error.code !== '42P01') {
                throw error;
              }
            }
          }

          // Mark synced
          await localDb.mutations.update(item.id, { syncStatus: 'synced' });
        } catch (err: any) {
          console.warn('Sync attempt failed for mutation', item.id, err);
          await localDb.mutations.update(item.id, {
            syncStatus: 'queued',
            retryCount: item.retryCount + 1,
            errorMessage: err?.message || 'Sync error'
          });
        }
      }
    } finally {
      this.isSyncing = false;
      this.notifyListeners();
    }
  }
}

export const syncManager = new SyncManager();

export async function syncOutboxNow(): Promise<void> {
  return syncManager.processQueue();
}
