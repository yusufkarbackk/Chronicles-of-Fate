import { Injectable } from '@nestjs/common';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { firebaseConfig } from 'src/firebase.config';

@Injectable()
export class FirebaseServiceService {
  private auth: Auth;
  constructor() {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
      console.log('Firebase initilized');
    }
    this.auth = getAuth(getApp());
  }
}
