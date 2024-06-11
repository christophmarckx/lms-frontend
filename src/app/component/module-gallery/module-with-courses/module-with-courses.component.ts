import {Component, inject, Input, OnInit} from '@angular/core';
import {ModuleWithCourses} from '../../../models/module/module-with-courses';
import {Module} from "../../../models/module/module";
import {ModuleService} from "../../../services/module/module.service";

@Component({
  selector: 'app-module-with-courses',
  standalone: true,
  imports: [],
  templateUrl: './module-with-courses.component.html',
  styleUrl: './module-with-courses.component.css'
})
export class ModuleWithCoursesComponent implements OnInit {
  moduleService = inject(ModuleService);

  @Input() selectedModule: Module;

  selectedModuleWithCourses: ModuleWithCourses;

  ngOnInit(): void {
    if (this.selectedModule) {
      this.moduleService.getModuleById(this.selectedModule.id)
        .subscribe(moduleWithCourses => this.selectedModuleWithCourses = moduleWithCourses)
    }
  }
}
