import {Component, Input} from '@angular/core';
import {Student} from "../../model/student/Student";
import {Coach} from "../../model/coach/Coach";
import {RouterLink} from "@angular/router";

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
