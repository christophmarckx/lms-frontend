import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {environment} from "../../../environment/environment";
import {CreateStudent} from "../../model/student/CreateStudent";
import {Student} from "../../model/student/Student";
import {Observable} from "rxjs";

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
