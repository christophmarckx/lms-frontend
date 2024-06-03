import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CourseService} from "../services/course/course.service";
import {Router} from "@angular/router";
import {CreateCourse} from "../models/CreateCourse";
import {PopupService} from "../services/popup/popup.service";
import {ProcessErrorPipe} from "../pipe/process-error.pipe";

@Component({
  selector: 'app-add-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ProcessErrorPipe
  ],
  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.css'
})
export class AddCourseFormComponent implements OnInit{

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly courseService: CourseService = inject(CourseService);
  private readonly router: Router = inject(Router);
  private readonly popupService: PopupService = inject(PopupService);
  public formControlNames : string[] = ['name', 'description'];
  public isFormInvalid: boolean = true;
  public createCourseError?: string;

  createCourseForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description: ['']
  })

  constructor() {
    this.createCourseForm.valueChanges.subscribe(() => this.onFormUpdate());
  }

  ngOnInit() {
  }
  onFormUpdate() {
    this.isFormInvalid = this.createCourseForm.invalid || !this.createCourseForm.touched;
  }

  addCourse() {
    if (this.isFormInvalid) {
      alert('The data you inserted is invalid. Try again!');
      return;
    }
    const rawValues = this.createCourseForm.getRawValue();
    const createCourse: CreateCourse = {
      name: rawValues.name!,
      description: rawValues.description ? rawValues.description : undefined
    }
    this.courseService.addCourse(createCourse).subscribe(
      (response) => {
        this.router.navigate(['']);
        this.popupService.showPopup('The course has been successfully added');
      },
      (response) => {
        this.createCourseError = response.error.errors;
      }
    );
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.createCourseForm.controls[controlName as keyof typeof this.createCourseForm.controls].hasError(errorName);
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.createCourseForm.controls[controlName as keyof typeof this.createCourseForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }
}
