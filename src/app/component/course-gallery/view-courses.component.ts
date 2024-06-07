import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CourseCardComponent} from "./course-card/course-card.component";
import {CourseService} from "../../services/course/course.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {UserRole} from '../../models/authentication/authenticated-user';
import {Course} from "../../models/course/course";
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";
import {StudentService} from "../../services/student/student.service";

@Component({
  selector: 'app-view-courses',
  standalone: true,
    imports: [
        AsyncPipe,
        NgIf,
        RouterLink,
        CourseCardComponent,
        LoadingSpinnerComponent
    ],
  templateUrl: './view-courses.component.html',
  styleUrl: './view-courses.component.css'
})
export class ViewCoursesComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  courseService = inject(CourseService);
  studentService = inject(StudentService);
  protected readonly UserRole = UserRole;

  courses: Course[];
  courseFollowed: Course;

  ngOnInit(): void {
    let authenticatedUser = this.authenticationService.getAuthenticatedUser()!

    if (authenticatedUser.role === UserRole.STUDENT) {
      this.studentService.getFollowedCourseByStudentId(authenticatedUser.id)
        .subscribe(course => {
          this.courseFollowed = course
          this.getAllCoursesFromBackend();
        })
    }
    else {
      this.getAllCoursesFromBackend();
    }
  }

  private getAllCoursesFromBackend() {
    this.courseService.getAllCourses().subscribe({
      next: courses => {
        this.courses = courses
        if (this.courseFollowed) {
          this.courses = this.courses.filter(course => course.id !== this.courseFollowed.id)
        }
      },
      error: err => {
        console.log(err)
      }
    });
  }
}
