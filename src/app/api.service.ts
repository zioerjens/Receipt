import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
// import {AngularFireAuth} from '@angular/fire/auth';
// import * as firebase from 'firebase';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    // private _af: AngularFireAuth,
  ) { }

  initGoogleOAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', async () => {
        const gAuth = await gapi.auth2.init({
          client_id: environment.GAPI_CLIENT_ID,
          fetch_basic_profile: true,
          scope: 'profile email'
        });
        resolve(gAuth);
      }, reject);
    });
  }

  // fetchGoogleUser(): Promise<any> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const gAuth = await this.initGoogleOAuth();
  //
  //       const oAuthUser = await gAuth.signIn();
  //       const authResponse = gAuth.currentUser.get().getAuthResponse();
  //       const firebaseUser = await this._af.auth.signInWithCredential(
  //         firebase.auth.GoogleAuthProvider.credential(authResponse.id_token, authResponse.access_token)
  //       );
  //
  //       sessionStorage.setItem('accessToken', authResponse.access_token);
  //
  //       resolve(firebaseUser);
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
  // }
}
