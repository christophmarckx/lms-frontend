import {Component, inject, Input, OnInit} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {Course} from "../../models/course/course";
import {PopupService} from "../../services/popup/popup.service";
import {CourseWithModules} from "../../models/course/course-with-modules";
import {ModuleCodelabsComponent} from "./module-codelabs/module-codelabs.component";
import {CodelabsCardComponent} from "./codelabs-card/codelabs-card.component";

@Component({
  selector: 'app-course-overview',
  standalone: true,
  imports: [
    ModuleCodelabsComponent,
    CodelabsCardComponent
  ],
  templateUrl: './course-overview.component.html',
  styleUrl: './course-overview.component.css'
})
export class CourseOverviewComponent implements OnInit {
  courseService = inject(CourseService);
  popupService = inject(PopupService);
  @Input() courseId: string;
  courseWithModules: CourseWithModules;

  ngOnInit(): void {
    this.courseService.getCourseWithModulesById(this.courseId)
      .subscribe({
        next: courseWithModules => {
          this.courseWithModules = courseWithModules
        },
        error: err => {
          this.popupService.showPopup(err.error, true);
        }
      });
  }
}
