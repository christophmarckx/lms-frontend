import {Component, inject, Input, OnInit} from '@angular/core';
import {AddCodelabCommentComponent} from "../forms/add-codelab-comment/add-codelab-comment.component";
import {CodelabService} from "../../services/codelab/codelab.service";
import {Codelab} from "../../models/codelab/codelab";
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {UserRole} from "../../models/authentication/authenticated-user";

@Component({
  selector: 'app-view-codelab',
  standalone: true,
    imports: [
        AddCodelabCommentComponent,
        LoadingSpinnerComponent,
      RouterLink
    ],
  templateUrl: './view-codelab.component.html',
  styleUrl: './view-codelab.component.css'
})
export class ViewCodelabComponent implements OnInit {

  codelabService: CodelabService = inject(CodelabService);
  authenticationService: AuthenticationService = inject(AuthenticationService);
  authenticatedUser: any;
  codelab: Codelab;

  @Input() id!: string;

  ngOnInit() {
    this.codelabService.getCodelab(this.id).subscribe(codelab => this.codelab = codelab);
    this.authenticatedUser = this.authenticationService.getAuthenticatedUser();
  }

  protected readonly UserRole = UserRole;
}
