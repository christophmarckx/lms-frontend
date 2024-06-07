import {Component, Input} from '@angular/core';
import {Codelab} from "../../../models/codelab/codelab";
import {ModuleCodelabsComponent} from "../module-codelabs/module-codelabs.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-codelabs-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './codelabs-card.component.html',
  styleUrl: './codelabs-card.component.css'
})
export class CodelabsCardComponent {
  @Input() codelabs : Codelab[] = [];

}
