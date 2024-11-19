import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class FirebaseService {
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('users');

  async sendNotification(
    titulo: string,
    descricao: string,
  ): Promise<BatchResponse | undefined> {
    const tokens = await this.getAllTokens();

    if (tokens.length === 0) {
      return undefined;
    }

    const message = {
      notification: {
        title: titulo,
        body: descricao,
      },
      tokens: tokens,
    };

    const response = await firebase.messaging().sendEachForMulticast(message);

    console.log(`Sucesso: ${response.successCount} tokens`);
    console.log(`Falha: ${response.failureCount} tokens`);

    return response;
  }

  async getAllTokens(): Promise<string[]> {
    const snapshot = await this._collectionRef.select('deviceToken').get();

    const tokens: string[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.deviceToken) {
        tokens.push(data.deviceToken);
      }
    });

    return tokens;
  }
}
