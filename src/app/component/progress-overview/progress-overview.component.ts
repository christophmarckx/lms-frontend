import {Component, inject, OnInit} from '@angular/core';
import {StudentService} from "../../services/student/student.service";
import {StudentWithProgress} from "../../models/student/student-with-progress";
import {AsyncPipe, NgIf} from "@angular/common";
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";
import {ModuleCardComponent} from "../module-gallery/module-card/module-card.component";
import {RouterLink} from "@angular/router";
import {ProgressCardComponent} from "./progress-card/progress-card.component";

@Component({
  selector: 'app-progress-overview',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingSpinnerComponent,
    ModuleCardComponent,
    NgIf,
    RouterLink,
    ProgressCardComponent
  ],
  templateUrl: './progress-overview.component.html',
  styleUrl: './progress-overview.component.css'
})
export class ProgressOverviewComponent implements OnInit {
  studentService = inject(StudentService);

  studentsWithProgress: StudentWithProgress[];

  ngOnInit(): void {
    this.studentService.getProgressOverview()
      .subscribe(studentsWithProgress => this.studentsWithProgress = studentsWithProgress);
  }
}
