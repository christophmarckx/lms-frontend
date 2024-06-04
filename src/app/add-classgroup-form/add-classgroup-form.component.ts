import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CourseService} from "../services/course/course.service";
import {Course} from "../models/Course";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {CreateClassgroup} from "../models/CreateClassgroup";
import {ClassgroupService} from "../services/classgroup/classgroup.service";
import {Router} from "@angular/router";
import {PopupService} from "../services/popup/popup.service";
import {ProcessErrorPipe} from "../pipe/process-error.pipe";
import {Coach} from "../model/coach/Coach";


@Component({
  selector: 'app-add-classgroup-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    ProcessErrorPipe
  ],
  templateUrl: './add-classgroup-form.component.html',
  styleUrl: './add-classgroup-form.component.css'
})
export class AddClassgroupFormComponent {

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly courseService: CourseService = inject(CourseService);
  private readonly classgroupService: ClassgroupService = inject(ClassgroupService);
  private readonly router: Router = inject(Router);
  private readonly popupService: PopupService = inject(PopupService);
  public formControlNames: string[] = ['name','courseId'];
  public isFormInvalid: boolean = true;
  public createClassgroupError?: string;
  public courseOptions$: Observable<Course[]>;
  public selectedCourseId: string;
  public coaches: Coach[];
  public coachesToAdd: Coach[];

  getCourses(): Observable<Course[]> {
    return this.courseService.getAllCourses();
  }

  constructor() {
    this.createClassgroupForm.valueChanges.subscribe(() => this.onFormUpdate());
    this.courseOptions$ = this.getCourses();
    this.selectedCourseId = "";
  }

  createClassgroupForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    courseId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]]
  });

  onFormUpdate() {
    this.isFormInvalid = this.createClassgroupForm.invalid || !this.createClassgroupForm.touched;
  }

  onCourseChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.createClassgroupForm.patchValue({
      courseId: selectedId
    });
  }

  addClassgroup() {
    if (this.isFormInvalid) {
      alert('The data that you inserted is not valid. Try again!');
      return;
    }
    const rawValues = this.createClassgroupForm.getRawValue();
    const createClassgroup: CreateClassgroup = {
      name: rawValues.name!,
      courseId: rawValues.courseId!
    }
    this.classgroupService.addClassgroup(createClassgroup).subscribe(
      (response) => {
        this.router.navigate(['']);
        this.popupService.showPopup('The classgroup has been successfully added');
      },
      (response) => {
        this.createClassgroupError = response.error.errors;
      }
    );
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.createClassgroupForm.controls[controlName as keyof typeof this.createClassgroupForm.controls].hasError(errorName);
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.createClassgroupForm.controls[controlName as keyof typeof this.createClassgroupForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }
}
