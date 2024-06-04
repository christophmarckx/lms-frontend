import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CourseService} from "../services/course/course.service";
import {Router} from "@angular/router";
import {CreateCourse} from "../models/CreateCourse";
import {PopupService} from "../services/popup/popup.service";
import {ProcessErrorPipe} from "../pipe/process-error.pipe";
import {ModuleService} from "../services/module/module.service";
import {AsyncPipe} from "@angular/common";
import {Module} from "../models/module";

@Component({
  selector: 'app-add-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ProcessErrorPipe,
    AsyncPipe
  ],
  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.css'
})
export class AddCourseFormComponent implements OnInit{

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly courseService: CourseService = inject(CourseService);
  private readonly moduleService = inject(ModuleService);
  private readonly router: Router = inject(Router);
  private readonly popupService: PopupService = inject(PopupService);
  public formControlNames : string[] = ['name', 'description'];
  public isFormInvalid: boolean = true;
  public createCourseError?: string;
  public modules: Module[];
  public modulesToAdd: Module[] = [];

  createCourseForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description: ['']
  })

  constructor() {
    this.createCourseForm.valueChanges.subscribe(() => this.onFormUpdate());
  }

  ngOnInit() {
    this.getModules();
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
      description: rawValues.description ? rawValues.description : undefined,
      moduleIds: this.modulesToAdd.map(module => module.id)
    }
    this.courseService.addCourse(createCourse).subscribe({
      next: response => {
        this.router.navigate(['/']);
        this.popupService.showPopup('The course has been successfully added');
      },
      error: err => {
        this.createCourseError = err.error.errors;
      }
    });
  }

  getModules() {
    return this.moduleService.getAllModules()
      .subscribe(modules => this.modules = modules);
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

  addModuleToCreationList(moduleToAdd: Module) {
    this.modulesToAdd.push(moduleToAdd);
    this.modules = this.modules.filter(module => module.id !== moduleToAdd.id);
  }

  removeModuleFromCreationList(moduleToRemove: Module) {
    this.modules.push(moduleToRemove);
    this.modulesToAdd = this.modulesToAdd.filter(module => module.id !== moduleToRemove.id);
  }
}
