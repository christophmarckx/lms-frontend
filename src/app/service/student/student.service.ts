import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {environment} from "../../../environment/environment";
import {CreateStudent} from "../../model/student/CreateStudent";
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

  createStudent(createStudent: CreateStudent) {
    return this.http.post<Student>(this.url, createStudent);
  }
}
