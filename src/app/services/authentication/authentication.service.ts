import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import Keycloak from "keycloak-js";
import {PopupService} from "../popup/popup.service";
import {AuthenticatedUser} from "../../models/authentication/authenticated-user";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private keycloak;

  private readonly popupService: PopupService = inject(PopupService);
  http = inject(HttpClient);
  session = new BehaviorSubject<any>({});
  backendUrl: string;

  constructor() {
    this.backendUrl = `${environment.backendUrl}/users`;

    this.keycloak = new Keycloak({
      url: `${environment.keycloakUrl}`,
      realm: `${environment.realm}`,
      clientId: `${environment.clientId}`
    });

    this.keycloak.init({
      onLoad: 'check-sso'
    })
      .then(authenticated => {
        console.log("authentication");
        if (authenticated) {
          this.getUserFromBackend()
        }
        else {
          this.clearUser()
        }
      })
      .catch(error => console.error('Failed to initialize adapter:', error))

    this.keycloak.onTokenExpired = ()=>{
      this.refreshToken()
    }
  }
  loginUser(url?: string) {
    return this.keycloak.login({redirectUri: url ? environment.keycloakRedirectUri + url : environment.keycloakRedirectUri});
  }

  logoutUser(errorMessage?: string) {
    return this.keycloak.logout({redirectUri: environment.keycloakRedirectUri}).then(() => {
      if (errorMessage) {
        localStorage.setItem('loginErrorPopup', "Logout: Consistency error with backend");
      }
    });
  }

  getToken() {
    return this.keycloak.token;
  }

  getTokenAsPromise() {
    return new Promise((resolve, reject) => {
      if (this.keycloak.token) {
        resolve(this.keycloak.token);
      } else {
        this.keycloak.onReady = (authenticated) => {
          if (authenticated) {
            resolve(this.keycloak.token)
          }
          else {
            reject()
          }
        }
      }
    });
  }

  private clearUser() {
    this.session.next({});
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private setSession(authenticatedUser: AuthenticatedUser) {
    this.session.next(authenticatedUser);
    localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
  }

  private getUserFromBackend() {
    this.http
      .get<AuthenticatedUser>(this.backendUrl)
      .subscribe({
        next: authenticatedUser => {
          this.setSession(authenticatedUser);
      },
      error: err => {
        console.error('Login error:', err);
        console.log(err);
        this.logoutUser(err.error);
      }
    });
  }

  getAuthenticatedUserAsObservable() {
    let authenticatedUser = localStorage.getItem('authenticatedUser')
    if (authenticatedUser) {
      this.session.next(JSON.parse(authenticatedUser));
    }
    else {
      this.session.next({});
    }

    return this.session.asObservable();
  }

  getAuthenticatedUser():AuthenticatedUser|undefined {
    if (localStorage.getItem('authenticatedUser'))
      return JSON.parse(localStorage.getItem('authenticatedUser')!);
    return undefined
  }

  private refreshToken() {
    console.log('Token expired. Attempting to refresh...');
    this.keycloak.updateToken().then(refreshed => {
      if (refreshed) {
        console.log('Token successfully refreshed');
      } else {
        console.warn('Token could not be refreshed, redirecting to login');
        this.keycloak.login();
      }
    }).catch(() => {
      console.error('Failed to refresh token, redirecting to login');
      this.keycloak.login();
    });
  }
}
