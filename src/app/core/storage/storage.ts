import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage!: Storage;
  private readonly ready: Promise<void>;

  constructor(private ionicStorage: Storage) {
    this.ready = this.init();
  }

  private async init(): Promise<void> {
    this._storage = await this.ionicStorage.create();
  }

  async get<T>(key: string): Promise<T | null> {
    await this.ready;
    return this._storage.get(key);
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.ready;
    await this._storage.set(key, value);
  }
}
