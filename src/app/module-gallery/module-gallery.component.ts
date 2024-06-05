import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ModuleCardComponent} from "./module-card/module-card.component";
import {Module} from "../models/module";
import {ModuleService} from "../services/module/module.service";
import {AddModuleFormComponent} from "../add-module-form/add-module-form.component";
import {RouterLink} from "@angular/router";
import {ModuleWithCourses} from "../models/ModuleWithCourses";
import {ModuleWithCoursesComponent} from "./module-with-courses/module-with-courses.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {UserRole} from "../model/authentication/AuthenticatedUser";

@Component({
  selector: 'app-module-gallery',
  standalone: true,
  imports: [ModuleCardComponent, AddModuleFormComponent, RouterLink, ModuleWithCoursesComponent, AsyncPipe, NgIf],
  templateUrl: './module-gallery.component.html',
  styleUrl: './module-gallery.component.css'
})
export class ModuleGalleryComponent implements OnInit{
  authenticationService: AuthenticationService = inject(AuthenticationService);
  modules: Module[];
  selectedModule: ModuleWithCourses | null;
  moduleService: ModuleService = inject(ModuleService);
  @ViewChild('module-card') moduleId: string = '';

  changeModuleId(newModuleId: string) {
    this.selectModule(newModuleId);
  }

  selectModule(moduleId: string) {
    if (this.selectedModule && moduleId === this.selectedModule.id) {
      this.selectedModule = null;
      return;
    }
    return this.moduleService.getModuleById(moduleId).subscribe(module => this.selectedModule = module);
  }

  ngOnInit() {
    this.moduleService.getAllModules().subscribe(modules => this.modules = modules);
  }

  protected readonly UserRole = UserRole;

}
