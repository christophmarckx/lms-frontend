import {Component, inject, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {ModuleCardComponent} from "../module-gallery/module-card/module-card.component";
import {ModuleWithCoursesComponent} from "../module-gallery/module-with-courses/module-with-courses.component";
import {RouterLink} from "@angular/router";
import {CodelabCardComponent} from "./codelab-card/codelab-card.component";
import {UserRole} from "../../models/authentication/authenticated-user";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Codelab} from "../../models/codelab/codelab";
import {CodelabService} from "../../services/codelab/codelab.service";
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-codelab-gallery',
  standalone: true,
  imports: [
    AsyncPipe,
    ModuleCardComponent,
    ModuleWithCoursesComponent,
    NgIf,
    RouterLink,
    CodelabCardComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './codelab-gallery.component.html',
  styleUrl: './codelab-gallery.component.css'
})
export class CodelabGalleryComponent implements OnInit {
  authenticationService: AuthenticationService = inject(AuthenticationService);
  codelabService: CodelabService = inject(CodelabService);
  protected readonly UserRole = UserRole;
  codelabs: Codelab[];

  ngOnInit() {
    this.codelabService.getAllCodelabs().subscribe(codelabs => this.codelabs = codelabs);
  }
}
