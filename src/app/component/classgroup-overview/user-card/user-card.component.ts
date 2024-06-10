import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Student} from '../../../models/student/student';
import {Coach} from "../../../models/coach/coach";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: Student | Coach;
  @Input() isPair!: boolean;
  @Input() showProfileLink: boolean = false;
}
