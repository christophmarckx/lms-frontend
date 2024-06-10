import {Component, Input} from '@angular/core';
import {StudentWithProgress} from "../../../models/student/student-with-progress";

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [],
  templateUrl: './progress-card.component.html',
  styleUrl: './progress-card.component.css'
})
export class ProgressCardComponent {
  @Input() studentWithProgress: StudentWithProgress;
  @Input() isPair!: boolean;
}
