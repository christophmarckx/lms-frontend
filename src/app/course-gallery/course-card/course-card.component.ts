import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Module} from "../../models/module";
import {Course} from "../../models/Course";

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() isPair!: boolean;
}
