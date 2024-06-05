import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {UpdateCourse} from "../../models/course/update-course";

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

  getCourseById(courseId: string): Observable<any> {
    return this.http.get(this.urlString + '/' + courseId).pipe();
  }

  updateCourseName(courseId: string, updateCourse: UpdateCourse): Observable<any> {
    return this.http.put(this.urlString + '/' + courseId, updateCourse);
  }
}
