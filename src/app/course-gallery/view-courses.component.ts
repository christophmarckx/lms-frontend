import {Component, inject,  OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {UserRole} from "../model/authentication/AuthenticatedUser";
import {CourseService} from "../services/course/course.service";
import {Course} from "../models/Course";
import {CourseCardComponent} from "./course-card/course-card.component";

@Component({
  selector: 'app-view-courses',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    RouterLink,
    CourseCardComponent
  ],
  templateUrl: './view-courses.component.html',
  styleUrl: './view-courses.component.css'
})
export class ViewCoursesComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  courseService = inject(CourseService);
  protected readonly UserRole = UserRole;

  courses: Course[] = [];

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: courses => {
        this.courses = courses
      },
      error: err => {
        console.log(err)
      }
    });
  }
}
