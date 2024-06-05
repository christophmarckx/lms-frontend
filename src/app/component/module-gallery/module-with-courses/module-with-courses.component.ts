import {Component, Input} from '@angular/core';
import { ModuleWithCourses } from '../../../models/module/module-with-courses';

@Component({
  selector: 'app-module-with-courses',
  standalone: true,
  imports: [],
  templateUrl: './module-with-courses.component.html',
  styleUrl: './module-with-courses.component.css'
})
export class ModuleWithCoursesComponent {
  @Input() moduleWithCourses: ModuleWithCourses;
}
