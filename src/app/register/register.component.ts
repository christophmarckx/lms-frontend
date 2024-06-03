import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {StudentService} from "../services/student/student.service";
import {catchError, throwError} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {repeatPasswordValidator} from "../utility/RepeatPasswordValidator";
import {PopupService} from "../services/popup/popup.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  createStudentForm: FormGroup;
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  studentService = inject(StudentService);
  errorMessage: string | undefined;

  ngOnInit(): void {
    this.createStudentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    },
      {
        validators: repeatPasswordValidator('password', 'repeatPassword')
      } as AbstractControlOptions
    )
  }

  onSubmit(){
    this.studentService.createStudent(this.createStudentForm.value)
      .pipe(
        catchError(error => {
          console.error('There was an error!', error);
          this.errorMessage = error.error;
          return throwError(() => new Error());
        }))
      .subscribe(data => {
        console.log(data);
        this.errorMessage = undefined;
        this.router.navigate(['/']);
      });
  }

}
