import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {ProcessErrorPipe} from "../../../pipe/process-error.pipe";
import {PopupService} from "../../../services/popup/popup.service";
import {CommentService} from "../../../services/comment/comment.service";
import {CreateComment} from "../../../models/comment/create-comment";

@Component({
  selector: 'app-add-codelab-comment',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ProcessErrorPipe,
    ReactiveFormsModule
  ],
  templateUrl: './add-codelab-comment.component.html',
  styleUrl: './add-codelab-comment.component.css'
})
export class AddCodelabCommentComponent implements OnInit{
  private readonly popupService: PopupService = inject(PopupService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  public isFormInvalid: boolean = true;
  public formControlNames : string[] = ['comment'];
  public createCodelabCommentError?: string;
  createCodelabCommentForm: FormGroup;
  commentService : CommentService = inject(CommentService);
  @Input() id: string;

  ngOnInit(): void {
    this.createCodelabCommentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    })
    this.createCodelabCommentForm.valueChanges.subscribe(() => this.onFormUpdate());
  }

  addComment(): void {
    if (this.isFormInvalid) {
      alert('The data you inserted is invalid. Try again!');
      return;
    }
    const rawValues = this.createCodelabCommentForm.getRawValue();
    const createComment: CreateComment = {
      comment: rawValues.comment!,
    }

    console.log(this.id)
    this.commentService.createCodelabComment(createComment);
  }

  //   this.commentService.createCodelabComment(createComment).subscribe(
  //     next:response => {
  //       this.router.navigate(["codelabs/" + this.id]);
  //       this.popupService.showPopup('Comment has been successfully added');
  //     },
  //     error:err => {
  //       this.createModuleError = response.error.errors;
  //     }
  //   );
  // }

  onFormUpdate() {
    this.isFormInvalid = this.createCodelabCommentForm.invalid;
  }


  hasError(controlName: string, errorName: string): boolean {
    return this.createCodelabCommentForm.controls[controlName as keyof typeof this.createCodelabCommentForm.controls].hasError(errorName);
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.createCodelabCommentForm.controls[controlName as keyof typeof this.createCodelabCommentForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }
}
