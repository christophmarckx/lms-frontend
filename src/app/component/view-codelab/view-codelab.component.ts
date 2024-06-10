import {Component, EventEmitter, inject, Input, OnInit, ViewChild} from '@angular/core';
import {AddCodelabCommentComponent} from "../forms/add-codelab-comment/add-codelab-comment.component";
import {CodelabService} from "../../services/codelab/codelab.service";
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {UserRole} from "../../models/authentication/authenticated-user";
import {CodelabWithComments} from "../../models/codelab/codelab-with-comments";
import {Comment} from "../../models/comment/comment";

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
  @ViewChild('addCodeLabComment') myComponent : AddCodelabCommentComponent
  codelabService: CodelabService = inject(CodelabService);
  authenticationService: AuthenticationService = inject(AuthenticationService);
  authenticatedUser: any;
  codelab: CodelabWithComments;

  @Input() id!: string;

  ngOnInit() {
    this.codelabService.getCodelabWithComments(this.id).subscribe(codelab =>
      {
        this.codelab = codelab;
        console.log(this.codelab);
      }
    );
    this.authenticatedUser = this.authenticationService.getAuthenticatedUser();
    //this.myEvent.subscribe(comment => this.addComment(comment))
  }

  addComment(comment: Comment) {
    this.codelab.comments.push(comment);
  }

  protected readonly UserRole = UserRole;
}
