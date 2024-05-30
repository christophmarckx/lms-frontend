import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private urlString: string;

  constructor(private http: HttpClient) {
    this.urlString = `${environment.backendUrl}/courses`
  }

  addCourse(course: any): Observable<any> {
    return this.http.post(this.urlString, course);
  }

  getAllCourses(): Observable<any> {
    return this.http.get(this.urlString);
  }


}
