import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CourseService} from "../services/course.service";
import {Course} from "../models/Course";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";


@Component({
  selector: 'app-add-classgroup-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './add-classgroup-form.component.html',
  styleUrl: './add-classgroup-form.component.css'
})
export class AddClassgroupFormComponent {

  public formControlNames: string[] = ['name','courseId'];
  public isFormInvalid: boolean = true;
  public createClassgroupError?: string;
  public courseOptions$: Observable<Course[]>;
  public selectedCourseId: string;

  getCourses(): Observable<Course[]> {
    return this.courseService.getAllCourses();
  }

  constructor(private formBuilder: FormBuilder, private courseService: CourseService) {
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

  }
}
