import * as admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { ConfigService } from '@nestjs/config';

export const firebaseConfig = {
  provide: 'FIREBASE_APP',
  useFactory: () => {
    const configService = new ConfigService();

    const credential = {
      credential: cert({
        clientEmail: configService.getOrThrow('CLIENT_EMAIL'),
        privateKey: configService.getOrThrow('PRIVATE_KEY'),
        projectId: configService.getOrThrow('PROJECT_ID'),
      }),
    } as admin.AppOptions;

    return admin.initializeApp({
      credential: credential.credential,
    });
  },
};
