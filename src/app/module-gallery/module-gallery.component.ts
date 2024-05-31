import {Component, inject, OnInit} from '@angular/core';
import {ModuleCardComponent} from "./module-card/module-card.component";
import {Module} from "../models/Module";
import {ModuleService} from "../services/module.service";
import {AddModuleFormComponent} from "../add-module-form/add-module-form.component";
import {RouterLink} from "@angular/router";
import {ModuleWithCourses} from "../models/ModuleWithCourses";
import {ModuleWithCoursesComponent} from "./module-with-courses/module-with-courses.component";

@Component({
  selector: 'app-module-gallery',
  standalone: true,
  imports: [ModuleCardComponent, AddModuleFormComponent, RouterLink, ModuleWithCoursesComponent],
  templateUrl: './module-gallery.component.html',
  styleUrl: './module-gallery.component.css'
})
export class ModuleGalleryComponent implements OnInit{
  modules: Module[];
  selectedModule: ModuleWithCourses;
  moduleService: ModuleService = inject(ModuleService);
  selectModule(moduleId: string) {
    return this.moduleService.getModuleById(moduleId).subscribe(module => this.selectedModule = module);
  }


  ngOnInit() {
        this.moduleService.getAllModules().subscribe(modules => this.modules = modules);
  }

}
