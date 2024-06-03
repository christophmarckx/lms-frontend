import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Module} from "../../models/module";
import {ModuleService} from "../../services/module/module.service";
import {ModuleWithCourses} from "../../models/ModuleWithCourses";

@Component({
  selector: 'app-module-card',
  standalone: true,
  imports: [],
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.css'
})
export class ModuleCardComponent {
  @Input() module!: Module;
  @Input() isPair!: boolean;
  @Output() stringEventEmitter = new EventEmitter<string>();
  @Input() isModuleSelected!: boolean;

  changeSelectedModuleId() {
    this.stringEventEmitter.emit(this.module.id);
  }

  btnTextToDisplay(): string {
    if (this.isModuleSelected) {
      return 'Hide courses';
    }
    return 'Display courses';
  }
}
