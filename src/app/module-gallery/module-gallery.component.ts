import {Component, inject, Inject, OnInit} from '@angular/core';
import {ModuleCardComponent} from "./module-card/module-card.component";
import {Module} from "../models/module";
import {ModuleService} from "../services/module.service";
import {AddModuleFormComponent} from "../add-module-form/add-module-form.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-module-gallery',
  standalone: true,
  imports: [ModuleCardComponent, AddModuleFormComponent, RouterLink],
  templateUrl: './module-gallery.component.html',
  styleUrl: './module-gallery.component.css'
})
export class ModuleGalleryComponent implements OnInit{

  modules: Module[];
  moduleService: ModuleService = inject(ModuleService);


  ngOnInit() {
        this.moduleService.getAllModules().subscribe(modules => this.modules = modules);
  }

}
