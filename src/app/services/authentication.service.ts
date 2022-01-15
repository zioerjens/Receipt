/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
// Leave that here, it's important. See https://stackoverflow.com/questions/38091215/import-gapi-auth2-in-angular-2-typescript/42782430#42782430
import {Injectable, NgZone, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {GoogleAuthService} from "ng-gapi";
declare var gapi: any;

@Injectable()
export class AuthenticationService {

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  readonly SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
  // Array of API discovery doc URLs for APIs used by the quickstart
  readonly DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

  constructor(
    private zone: NgZone,
    private googleAuth: GoogleAuthService
  ) {}

  // /**
  //  *  On load, called to load the auth2 library and API client library.
  //  */
  // handleClientLoad() {
  //   gapi.load('client:auth2', () => this.initClient());
  // }

  initLoadClient() {
    this.loadClient().then(
      result => console.log('client load result: ' + result),
      err => console.log('client load error: ' + err),
    );
  }

  /**
   * Alternative client load
   */
  loadClient(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.load('client', {
          callback: resolve,
          onerror: reject,
          timeout: 1000, // 5 seconds.
          ontimeout: reject
        });
      });
    });
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  initClient() {
    this.zone.run(() => {
      gapi.client.init({
        apiKey: environment.API_KEY,
        clientId: environment.GAPI_CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES
      }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(); // not working like this. scope problems

        // Handle the initial sign-in state.
        console.log('singed in?');
        console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
      }, function(error) {
        console.log('error: ' + error);
      });
    });
  }

  // Stackoverflow
  // initClient(): Promise<any> {
  //   const initObj = {
  //     'apiKey': environment.API_KEY,
  //     'discoveryDocs': this.DISCOVERY_DOCS,
  //   };
  //
  //   return new Promise((resolve, reject) => {
  //     this.zone.run(() => {
  //       gapi.client.init(initObj).then(resolve, reject);
  //     });
  //   });
  // }

  /**
   *  Sign in the user
   */
  signIn() {
    //gapi.auth2.getAuthInstance().signIn();

    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => console.log(res));
      });
  }

  /**
   *  Sign out
   */
  signOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Print all Labels in the authorized user's inbox. If no labels
   * are found an appropriate message is printed.
   */
  fetchLabels() {
    gapi.client.gmail.users.labels.list({
      'userId': 'me'
    }).then(function(response) {
      var labels = response.result.labels;
      console.log('labels: ' + labels);
    });
  }

  /*


  initGoogleOAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('initGoogleOAuth')
      gapi.load('auth2', async () => {
        console.log('loading auth2')
        const gAuth = await gapi.auth2.init({
          client_id: environment.GAPI_CLIENT_ID,
          fetch_basic_profile: true,
          scope: 'profile email'
        });
        resolve(gAuth);
      }, reject);
    });
  }

  checkForGmailLogin() {
    console.log('checkForGmailLogin');
    const scope = ['https://mail.google.com/',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/gmail.send'].join(' ');
    gapi.auth.authorize(
      {
        'client_id': environment.GAPI_CLIENT_ID,
        'scope': scope,
        'immediate': true,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
      }, authResult => {
        if (authResult && !authResult.error) {
          console.log('authenticated! result: ' + authResult);
        } else {
          console.log('Error in Load gmail');
        }
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
  // }*/
}

