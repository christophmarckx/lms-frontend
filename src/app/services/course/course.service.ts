import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UpdateCourse} from "../../models/course/update-course";
import {Course} from "../../models/course/course";
import {CourseWithModules} from "../../models/course/course-with-modules";
import { environment } from '../../../environments/environment';

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

  getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(this.urlString + '/' + courseId);
  }

  getCourseWithModulesById(courseId: string): Observable<CourseWithModules> {
    return this.http.get<CourseWithModules>(this.urlString + '/' + courseId + "/codelabs");
  }

  updateCourseName(courseId: string, updateCourse: UpdateCourse): Observable<any> {
    return this.http.put(this.urlString + '/' + courseId, updateCourse);
  }
}
