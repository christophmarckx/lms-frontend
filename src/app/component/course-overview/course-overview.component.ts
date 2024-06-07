import {Component, inject, Input, OnInit} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {Course} from "../../models/course/course";
import {PopupService} from "../../services/popup/popup.service";
import {CourseWithModules} from "../../models/course/course-with-modules";
import {ModuleCodelabsComponent} from "./module-codelabs/module-codelabs.component";
import {CodelabsCardComponent} from "./codelabs-card/codelabs-card.component";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {UserRole} from "../../models/authentication/authenticated-user";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-course-overview',
  standalone: true,
  imports: [
    ModuleCodelabsComponent,
    CodelabsCardComponent,
    RouterLink
  ],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.css'
})
export class CourseOverviewComponent implements OnInit {
  courseService = inject(CourseService);
  popupService = inject(PopupService);
  authenticationService: AuthenticationService = inject(AuthenticationService);
  @Input() id: string;
  authenticatedUser: any;
  courseWithModules: CourseWithModules;

  ngOnInit(): void {
    this.courseService.getCourseWithModulesById(this.id)
      .subscribe({
        next: courseWithModules => {
          this.courseWithModules = courseWithModules
        },
        error: err => {
          this.popupService.showPopup(err.error, true);
        }
      });
    this.authenticatedUser = this.authenticationService.getAuthenticatedUser();
  }

  protected readonly UserRole = UserRole;
}
