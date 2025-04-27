import { readFileSync } from 'fs';
import * as admin from 'firebase-admin';
import { join } from 'path';

export const firebaseConfig = {
  provide: 'FIREBASE_APP',
  useFactory: () => {
    const serviceAccountPath = join('./fcm-service-account.json');

    const serviceAccount = JSON.parse(
      readFileSync(serviceAccountPath, 'utf8'),
    ) as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  },
};
