import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CourseCardComponent} from "./course-card/course-card.component";
import {CourseService} from "../../services/course/course.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {UserRole} from '../../models/authentication/authenticated-user';
import {Course} from "../../models/course/course";
import {CodelabsCardComponent} from "../course-overview/codelabs-card/codelabs-card.component";
import {ModuleCodelabsComponent} from "../course-overview/module-codelabs/module-codelabs.component";

@Component({
  selector: 'app-view-courses',
  standalone: true,
    imports: [
        AsyncPipe,
        NgIf,
        RouterLink,
        CourseCardComponent,
        CodelabsCardComponent,
        ModuleCodelabsComponent
    ],
  templateUrl: './view-courses.component.html',
  styleUrl: './view-courses.component.css'
})
export class ViewCoursesComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  courseService = inject(CourseService);
  protected readonly UserRole = UserRole;

  courses: Course[];

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
