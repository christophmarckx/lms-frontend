import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {StudentService} from "../service/student/student.service";
import {catchError, throwError} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {confirmPasswordValidator} from "../utility/ConfirmPasswordValidator";

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
      confirmPassword: ['', Validators.required],
    },
      {
        validators: confirmPasswordValidator('password', 'confirmPassword')
      } as AbstractControlOptions
    )
  }

  onSubmit(){
    this.studentService.createStudent(this.createStudentForm.value, this.createStudentForm.value.password)
      .pipe(
        catchError(error => {
          console.error('There was an error!', error);
          this.errorMessage = error.error.errorMessage !== undefined ? error.error.errorMessage : error.error.error;
          return throwError(() => new Error());
        }))
      .subscribe(data => {
        console.log(data);
        this.errorMessage = undefined;
        this.router.navigate(['/']);
      });
  }

}
