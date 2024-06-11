import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ModuleCardComponent} from "./module-card/module-card.component";
import {RouterLink} from "@angular/router";
import {ModuleWithCoursesComponent} from "./module-with-courses/module-with-courses.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {AddModuleFormComponent} from '../forms/add-module-form/add-module-form.component';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ModuleService} from "../../services/module/module.service";
import {UserRole} from '../../models/authentication/authenticated-user';
import {ModuleWithCourses} from "../../models/module/module-with-courses";
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";
import {ModuleHierarchy} from "../../models/module/module-hierarchy";

@Component({
  selector: 'app-module-gallery',
  standalone: true,
  imports: [ModuleCardComponent, AddModuleFormComponent, RouterLink, ModuleWithCoursesComponent, AsyncPipe, NgIf, LoadingSpinnerComponent],
  templateUrl: './module-gallery.component.html',
  styleUrl: './module-gallery.component.css'
})
export class ModuleGalleryComponent implements OnInit{
  authenticationService: AuthenticationService = inject(AuthenticationService);
  moduleHierarchy: ModuleHierarchy[];
  selectedModule: ModuleWithCourses | null;
  moduleService: ModuleService = inject(ModuleService);
  @ViewChild('module-card') moduleId: string = '';

  ngOnInit() {
    this.moduleService.getModuleHierarchy().subscribe(moduleHierarchy => this.moduleHierarchy = moduleHierarchy);
  }

  protected readonly UserRole = UserRole;

}
