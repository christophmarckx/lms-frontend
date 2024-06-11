import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {ProcessErrorPipe} from "../../../pipe/process-error.pipe";
import {PopupService} from "../../../services/popup/popup.service";
import {CommentService} from "../../../services/comment/comment.service";
import {CreateComment} from "../../../models/comment/create-comment";
import {Comment} from "../../../models/comment/comment";

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
  @Output() myEventEmitter: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Input({required: true}) codelabId!: string;
  private readonly popupService: PopupService = inject(PopupService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  public isFormInvalid: boolean = true;
  public createCodelabCommentError?: string;
  createCodelabCommentForm: FormGroup;
  commentService : CommentService = inject(CommentService);

  ngOnInit(): void {
    this.createCodelabCommentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    })
    this.createCodelabCommentForm.valueChanges.subscribe(() => this.onFormUpdate());
  }

  addComment(): void {
    if (this.isFormInvalid) {
      this.popupService.showPopup('Data is not valid');
      return;
    }
    const rawValues = this.createCodelabCommentForm.getRawValue();
    const createComment: CreateComment = {
      comment: rawValues.comment!,
    }

    this.commentService.createCodelabComment(createComment, this.codelabId).subscribe({
      next: (response)  => {
        this.myEventEmitter.emit(response);
        this.createCodelabCommentForm.patchValue({comment: ''})
        this.createCodelabCommentForm.controls['comment'].reset();
        this.popupService.showPopup('Comment has been successfully added');
      },
      error:err => {
        this.createCodelabCommentError = err.error.errors;
      }
    });
  }

  onFormUpdate() {
    this.isFormInvalid = this.createCodelabCommentForm.invalid;
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.createCodelabCommentForm.controls[controlName as keyof typeof this.createCodelabCommentForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }
}
