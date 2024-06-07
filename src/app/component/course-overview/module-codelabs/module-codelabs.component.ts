import {Component, Input} from '@angular/core';
import {ModuleWithCodelabs} from "../../../models/module/module-with-codelabs";
import {CodelabsCardComponent} from "../codelabs-card/codelabs-card.component";

@Component({
  selector: 'app-module-codelabs',
  standalone: true,
  imports: [
    CodelabsCardComponent
  ],
  templateUrl: './module-codelabs.component.html',
  styleUrl: './module-codelabs.component.css'
})
export class ModuleCodelabsComponent {
  @Input() moduleWithCodelabs: ModuleWithCodelabs;
  @Input() level: number;

  getMargin(level: number) {
    return 'margin-left:' + 20 * level + 'px';
  }
}
