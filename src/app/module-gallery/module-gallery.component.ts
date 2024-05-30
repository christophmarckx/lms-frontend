import {Component, inject, OnInit} from '@angular/core';
import {ModuleCardComponent} from "./module-card/module-card.component";
import {Module} from "../models/module";
import {ModuleService} from "../services/module.service";

@Component({
  selector: 'app-module-gallery',
  standalone: true,
  imports: [ModuleCardComponent],
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
