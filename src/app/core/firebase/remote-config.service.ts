import { Injectable, signal } from '@angular/core';
import { getRemoteConfig, fetchAndActivate, getValue, RemoteConfig } from 'firebase/remote-config';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  readonly enableCategories = signal<boolean>(false);

  private remoteConfig!: RemoteConfig;

  constructor(private firebaseService: FirebaseService) {
    this.initRemoteConfig();
  }

  private initRemoteConfig(): void {
    this.remoteConfig = getRemoteConfig(this.firebaseService.getApp());

    this.remoteConfig.defaultConfig = {
      enable_categories: false,
    };

    this.remoteConfig.settings = {
      fetchTimeoutMillis: 60_000,
      minimumFetchIntervalMillis: 10_000,
    };

    this.loadRemoteConfig();
  }

  private async loadRemoteConfig(): Promise<void> {
    try {
      const activated = await fetchAndActivate(this.remoteConfig);

      if (activated) {
        const enabled = getValue(this.remoteConfig, 'enable_categories').asBoolean();

        this.enableCategories.set(enabled);
      }
    } catch (error) {
      console.warn('[RemoteConfig] Using default values', error);
    }
  }
}
