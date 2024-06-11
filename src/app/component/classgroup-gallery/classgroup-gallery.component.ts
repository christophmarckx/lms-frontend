import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {CourseCardComponent} from "../course-gallery/course-card/course-card.component";
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";
import {ClassgroupCardComponent} from "./classgroup-card/classgroup-card.component";
import {UserRole} from "../../models/authentication/authenticated-user";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ClassgroupService} from "../../services/classgroup/classgroup.service";
import {Classgroup} from "../../models/classgroup/classgroup";

@Component({
  selector: 'app-classgroup-gallery',
  standalone: true,
  imports: [
    AsyncPipe,
    CourseCardComponent,
    LoadingSpinnerComponent,
    NgIf,
    RouterLink,
    ClassgroupCardComponent
  ],
  templateUrl: './classgroup-gallery.component.html',
  styleUrl: './classgroup-gallery.component.css'
})
export class ClassgroupGalleryComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  classgroupService = inject(ClassgroupService);
  protected readonly UserRole = UserRole;

  classgroups: Classgroup[];

  ngOnInit(): void {
    this.classgroupService.getAllCourses().subscribe({
      next: classgroups => {
        this.classgroups = classgroups
      },
      error: err => {
        console.log(err)
      }
    });
  }
}
