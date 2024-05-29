import {Component, OnInit} from '@angular/core';
import {Course} from "../models/Course";
import {CourseService} from "../services/course/course.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateCourse} from "../models/UpdateCourse";

@Component({
  selector: 'app-update-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-course-form.component.html',
  styleUrl: './update-course-form.component.css'
})
export class UpdateCourseFormComponent implements OnInit {

  public formControlNames: string[] = ['name'];
  public isFormInvalid: boolean = true;
  public updateCourseNameError?: string;
  public courseId: string;

  getCourseById(courseId: string) {
    this.courseService.getCourseById(courseId).subscribe((course) => {
      this.updateCourseNameForm.patchValue({
        name: course.name
      })
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') === null) {
        this.router.navigate(['']);
      }
      this.courseId = params.get('id')!;
      this.getCourseById(params.get('id')!);
    })
  }

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.updateCourseNameForm.valueChanges.subscribe(() => this.onFormUpdate())
  }

  updateCourseNameForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
  });

  onFormUpdate() {
    this.isFormInvalid = this.updateCourseNameForm.invalid;
  }

  updateCourseName(){
    if(this.isFormInvalid){
      alert('The data that you inserted is not valid. Try again!');
      return;
    }
    const rawValues = this.updateCourseNameForm.getRawValue();
    const updateCourse: UpdateCourse = {
      name: rawValues.name!
    }
    this.courseService.updateCourseName(this.courseId, updateCourse).subscribe(
      (response) => {
        this.router.navigate(['']);
      },
      (error) => {
        this.updateCourseNameError = JSON.parse(error.error).message;
      }
    )
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.updateCourseNameForm.controls[controlName as keyof typeof this.updateCourseNameForm.controls].hasError(errorName);
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.updateCourseNameForm.controls[controlName as keyof typeof this.updateCourseNameForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }
}

