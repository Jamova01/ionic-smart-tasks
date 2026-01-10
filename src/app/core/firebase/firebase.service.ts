import { Injectable } from '@angular/core';
import { firebaseApp } from './firebase.config';
import { FirebaseApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private readonly app: FirebaseApp;

  constructor() {
    this.app = firebaseApp;
  }

  getApp(): FirebaseApp {
    return this.app;
  }
}
