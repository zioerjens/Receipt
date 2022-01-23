import {Injectable, NgZone, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {GoogleAuthService} from 'ng-gapi';
declare var gapi: any;

@Injectable()
export class AuthenticationService {

  constructor(
    private googleAuth: GoogleAuthService
  ) {}

  /**
   *  Sign in the user
   */
  signIn(): void {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => console.log(res));
      });
  }

  /**
   *  Sign out
   */
  signOut(): void {
    gapi.auth2.getAuthInstance().signOut();
  }

}

