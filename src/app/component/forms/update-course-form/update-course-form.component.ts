import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../../services/course/course.service";
import {PopupService} from "../../../services/popup/popup.service";
import {UpdateCourse} from "../../../models/course/update-course";
import {LoadingSpinnerComponent} from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-update-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './update-course-form.component.html',
  styleUrl: './update-course-form.component.css'
})
export class UpdateCourseFormComponent implements OnInit {
  private readonly courseService: CourseService = inject(CourseService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly popupService: PopupService = inject(PopupService);

  @Input() id: string;

  public formControlNames: string[] = ['name'];
  public isFormInvalid: boolean = true;
  public updateCourseNameError?: string;
  public courseName: string = '';

  getCourseById(courseId: string) {
    return this.courseService.getCourseById(courseId);
  }

  ngOnInit() {
    this.getCourseById(this.id).subscribe((course) => {
      this.courseName = course.name;
      this.updateCourseNameForm.patchValue({
        name: course.name
      })
    });
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
    this.courseService.updateCourseName(this.id, updateCourse).subscribe(
      (response) => {
        this.router.navigate(['']);
        this.popupService.showPopup('The course has been successfully updated');
      },
      (error) => {
        this.updateCourseNameError = JSON.parse(error.error).message;
      }
    )
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.updateCourseNameForm.controls[controlName as keyof typeof this.updateCourseNameForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }
}

