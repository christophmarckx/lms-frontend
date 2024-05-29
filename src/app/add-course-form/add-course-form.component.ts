import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {CourseService} from "../services/course/course.service";
import {Router} from "@angular/router";
import {CreateCourse} from "../models/CreateCourse";

@Component({
  selector: 'app-add-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.css'
})
export class AddCourseFormComponent implements OnInit{

  public formControlNames : string[] = ['name', 'description'];
  public isFormInvalid: boolean = true;
  public createCourseError?: string;

  createCourseForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description: ['']
  })

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private router: Router) {
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
      },
      (error) => {
        this.createCourseError = JSON.parse(error.error).message;
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
