import {Component, inject, Input} from '@angular/core';
import {Module} from "../../models/Module";
import {ModuleService} from "../../services/module.service";
import {ModuleWithCourses} from "../../models/ModuleWithCourses";

@Component({
  selector: 'app-module-card',
  standalone: true,
  imports: [],
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.css'
})
export class ModuleCardComponent {
  @Input() module: Module;

}
