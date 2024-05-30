import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environment/environment";
import {AuthenticationInformation} from "../../model/authentication/AuthenticationInformation";
import {AuthenticatedUser} from "../../model/authentication/AuthenticatedUser";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  http = inject(HttpClient);
  session = new BehaviorSubject<any>({});
  refreshTokenInProgress = false;
  url: string;
  backendUrl: string;
  clientId: string = `${environment["clientId"]}`;
  clientSecret: string = `${environment["clientSecret"]}`;

  constructor() {
    this.url = `${environment.oidcUrl}`;
    this.backendUrl = `${environment.backendUrl}/users`;
  }

  loginUser(email: string, password: string | null) {
    let body = new URLSearchParams();
    body.set('username', email);

    if (password === null) {
      let refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken === null) {
        this.logoutUser();
        return;
      }

      body.set('grant_type', 'refresh_token');
      body.set('refresh_token', refreshToken);
      body.set('client_id', this.clientId);
      body.set('client_secret', this.clientSecret);
    }
    else {
      body.set('password', password);
      body.set('grant_type', 'password');
      body.set('client_id', this.clientId);
      body.set('client_secret', this.clientSecret);
    }

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http
      .post<AuthenticationInformation>(this.url, body, options)
  }

  logoutUser() {
    this.session.next({});
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  setSession(authenticatedUser: AuthenticatedUser) {
    this.session.next(authenticatedUser);
    localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
  }

  getUserFromBackend(email: string) {
    return this.http
      .get<AuthenticatedUser>(this.backendUrl);
  }

  getUserFromLocalStorage() {
    let token = localStorage.getItem('access_token');

    if (token === null) {
      this.logoutUser();
      return this.session.asObservable();
    }

    if (this.isExpired(token)) {
      this.refreshToken()
    }

    if (!this.session.getValue().email && localStorage.getItem("authenticatedUser")) {
      this.session.next(JSON.parse(localStorage.getItem("authenticatedUser")!));
    }

    return this.session.asObservable();
  }

  refreshToken() {
    if (this.refreshTokenInProgress) {
      return;
    }
    this.refreshTokenInProgress = true;
    console.log("refresh the token");

    let authenticatedUser: AuthenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser")!)

    let subscribe = this.loginUser(authenticatedUser.email, null)
    if (subscribe === undefined) {
      this.logoutUser();
      this.refreshTokenInProgress = false;
      return;
    }

    subscribe.subscribe({
      next: authenticationInformation => {

        localStorage.setItem('access_token', authenticationInformation.access_token);
        localStorage.setItem('refresh_token', authenticationInformation.refresh_token);
        console.log("refresh done");
        this.refreshTokenInProgress = false;
      },
      error: err => {
        console.error('Login with refresh token error:', err);
        this.logoutUser();
        this.refreshTokenInProgress = false;
      }
    });
  }

  public isExpired(token: string) {
    const expiry = this.decodeToken(token).exp;

    if (expiry === undefined)
      return true;

    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public decodeToken(jwtToken: string) {
    return jwtDecode<JwtPayload>(jwtToken);
  }
}
