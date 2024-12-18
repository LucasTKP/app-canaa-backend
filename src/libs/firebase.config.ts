import * as firebase from 'firebase-admin';

export function initializeFirebase() {
  var serviceAccount = JSON.parse(process.env.FIREBASE!);
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
}
