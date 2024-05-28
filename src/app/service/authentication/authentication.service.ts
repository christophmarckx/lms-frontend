import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environment/environment";
import {AuthenticationInformation} from "../../model/authentication/AuthenticationInformation";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  http = inject(HttpClient);
  session = new BehaviorSubject<any>({});
  refreshTokenInProgress = false;
  url: string;

  constructor() {
    this.url = `${environment.oidcUrl}`;
  }

  loginAdminToKeycloak() {
    let body = new URLSearchParams();
    body.set('username', 'trapezium');
    body.set('password', '!howDoYouSpellThat?');
    body.set('grant_type', 'password');
    body.set('client_id', 'admin-cli');

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<AuthenticationInformation>(this.url + '/realms/' + `${environment.realm}` + '/protocol/openid-connect/token', body, options);
  }

  createUserInKeycloak(email: string, password: string, adminAccessToken: string) {
    let body = {
      username: email,
      enabled: true,
      credentials: [{
        type: "password",
        value: password,
        temporary: false
      }]
    }

    let options = {
      headers: new HttpHeaders().set('Authorization', "Bearer " + adminAccessToken)
    };

    return this.http.post<any>(this.url + '/admin/realms/' + `${environment.realm}` + '/users', body, options);
  }

  getUserFromKeycloak(email: string, adminAccessToken: string) {
    let options = {
      headers: new HttpHeaders().set('Authorization', "Bearer " + adminAccessToken)
    };

    return this.http.get<any>(this.url + '/admin/realms/' + `${environment.realm}` + '/users?username=' + email, options);
  }

  addRoleToUser(userId: string, adminAccessToken: string) {
    let options = {
      headers: new HttpHeaders().set('Authorization', "Bearer " + adminAccessToken)
    };

    let body = [
      {
        "id": "753cd57c-980a-4ae5-bb6c-65499c1f515f",
        "name": "STUDENT"
      }
    ]

    return this.http.post<any>(this.url + '/admin/realms/' + `${environment.realm}` + '/users/' + userId + '/role-mappings/clients/317ec40c-49e2-4940-9f8e-9493fce737c5', body, options);
  }

  deleteUserFromKeycloak(userId: string, adminAccessToken: string) {
    let options = {
      headers: new HttpHeaders().set('Authorization', "Bearer " + adminAccessToken)
    };

    return this.http.delete<any>(this.url + '/admin/realms/' + `${environment.realm}` + '/users/' + userId, options);
  }
}
