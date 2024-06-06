import {Component, Input} from '@angular/core';
import {Classgroup} from "../../../models/classgroup/classgroup";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-classgroup-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './classgroup-card.component.html',
  styleUrl: './classgroup-card.component.css'
})
export class ClassgroupCardComponent {
  @Input() isPair!: boolean;
  @Input() classGroup: Classgroup;
}
