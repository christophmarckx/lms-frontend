import {Component, Input} from '@angular/core';
import {Module} from "../../../models/module/module";
import {ModuleHierarchy} from "../../../models/module/module-hierarchy";
import {ModuleWithCoursesComponent} from "../module-with-courses/module-with-courses.component";

@Component({
  selector: 'app-module-card',
  standalone: true,
  imports: [
    ModuleWithCoursesComponent
  ],
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.css'
})
export class ModuleCardComponent {
  @Input() moduleHierarchy!: ModuleHierarchy;
  @Input() isPair!: boolean;
  @Input() level: number;

  selectedModule: Module |undefined;

  changeSelectedModuleId() {
    if (this.selectedModule) {
      this.selectedModule = undefined
    }
    else {
      this.selectedModule = this.moduleHierarchy;
    }
  }

  getMargin(level: number) {
    return 'margin-left:' + 20 * level + 'px';
  }

  btnTextToDisplay(): string {
    if (this.selectedModule) {
      return 'Hide courses';
    }
    return 'Show courses';
  }
}
