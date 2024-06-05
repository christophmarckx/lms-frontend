import {Component, Input} from '@angular/core';
import {Codelab} from "../../../models/codelab/codelab";
import {ModuleCodelabsComponent} from "../module-codelabs/module-codelabs.component";

@Component({
  selector: 'app-codelabs-card',
  standalone: true,
  imports: [
    ModuleCodelabsComponent
  ],
  templateUrl: './codelabs-card.component.html',
  styleUrl: './codelabs-card.component.css'
})
export class CodelabsCardComponent {
  @Input() codelabs : Codelab[] = [];

}
