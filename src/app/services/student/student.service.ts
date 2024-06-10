import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {Observable} from "rxjs";
import {Student} from "../../models/student/student";
import {CreateStudent} from "../../models/student/create-student";
import {Course} from "../../models/course/course";
import { environment } from '../../../environments/environment';
import {StudentWithProgress} from "../../models/student/student-with-progress";

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

  getFollowedCourseByStudentId(studentId: string): Observable<Course> {
    return this.http.get<Course>(this.url + '/' + studentId + '/course');
  }

  getProgressOverview(): Observable<StudentWithProgress[]> {
    return this.http.get<StudentWithProgress[]>(this.url + '/progress');
  }
}
