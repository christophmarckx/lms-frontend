import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Student} from "../../models/student/student";
import {CreateStudent} from "../../models/student/create-student";

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

  createStudent(createStudent: CreateStudent) {
    return this.http.post<Student>(this.url, createStudent);
  }

  getStudentById(studentId?: string): Observable<Student> {
    if (studentId) {
      return this.http.get<Student>(this.url + '/' + studentId);
    }
    return this.http.get<Student>(this.url);
  }
}
