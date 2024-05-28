import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {environment} from "../../../environment/environment";
import {CreateStudent} from "../../model/student/CreateStudent";
import {catchError, switchMap} from "rxjs";
import {Student} from "../../model/student/Student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  http = inject(HttpClient);
  authenticationService = inject(AuthenticationService);
  url: string;

  constructor() {
    this.url = `${environment.backendUrl}/students`;
  }

  createStudent(createStudent: CreateStudent, password: string) {
    return this.authenticationService.loginAdminToKeycloak()
      .pipe(
        switchMap(adminAuthenticationInformation => {
          return this.authenticationService.createUserInKeycloak(
            createStudent.email,
            password,
            adminAuthenticationInformation.access_token
          ).pipe(
            switchMap(() =>
              this.authenticationService.getUserFromKeycloak(createStudent.email, adminAuthenticationInformation.access_token)
            ),
            switchMap(user =>
              this.authenticationService.addRoleToUser(user[0].id, adminAuthenticationInformation.access_token)
                .pipe(
                  switchMap(() =>
                    this.http.post<Student>(this.url, createStudent)
                  ),
                  catchError(error => {
                    console.error('Error during add role or backend request:', error);
                    console.log("deleting user");
                    this.authenticationService.deleteUserFromKeycloak(user[0].id, adminAuthenticationInformation.access_token)
                      .pipe(
                        catchError(error => {
                          console.error('Error during deleting user', error)
                          throw error;
                        }))
                      .subscribe(data => console.log(data))
                    throw error;
                  })
                )
            ),
            catchError(error => {
              console.error('Error during customer creation:', error);
              throw error;
            })
          );
        }),
        catchError(error => {
          console.error('Error logging in to Keycloak:', error);
          throw error;
        })
      );
  }
}
