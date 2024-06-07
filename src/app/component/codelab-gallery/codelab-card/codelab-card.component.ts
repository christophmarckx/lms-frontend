import {Component, Input} from '@angular/core';
import {Codelab} from "../../../models/codelab/codelab";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-codelab-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './codelab-card.component.html',
  styleUrl: './codelab-card.component.css'
})
export class CodelabCardComponent {
  @Input() codelab!: Codelab;
  @Input() isPair!: boolean;
}
