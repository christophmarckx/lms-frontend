import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";
import {ProcessErrorPipe} from "../../../pipe/process-error.pipe";
import {CourseService} from "../../../services/course/course.service";
import {ClassgroupService} from "../../../services/classgroup/classgroup.service";
import {PopupService} from "../../../services/popup/popup.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {CoachService} from "../../../services/coach/coach.service";
import {Coach} from "../../../models/coach/coach";
import {CreateClassgroup} from "../../../models/classgroup/create-classgroup";
import {Course} from "../../../models/course/course";



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
export class AddClassgroupFormComponent implements OnInit {

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly courseService: CourseService = inject(CourseService);
  private readonly classgroupService: ClassgroupService = inject(ClassgroupService);
  private readonly router: Router = inject(Router);
  private readonly popupService: PopupService = inject(PopupService);
  private readonly coachService: CoachService = inject(CoachService);
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);
  public formControlNames: string[] = ['name', 'courseId'];
  public isFormInvalid: boolean = true;
  public createClassgroupError?: string;
  public courseOptions$: Observable<Course[]>;
  public selectedCourseId: string;
  public coaches: Coach[];
  public coachesToAdd: Coach[] = [];
  private authenticatedCoachId: string;

  constructor() {
    this.createClassgroupForm.valueChanges.subscribe(() => this.onFormUpdate());
    this.courseOptions$ = this.getCourses();
    this.selectedCourseId = "";
  }

  ngOnInit() {
    this.getCoaches();
    this.authenticationService.getAuthenticatedUserAsObservable().subscribe(user => this.authenticatedCoachId = user.id);
  }

  getCourses(): Observable<Course[]> {
    return this.courseService.getAllCourses();
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
      courseId: rawValues.courseId!,
      coaches: this.coachesToAdd.map(coach => coach.id)
    }
    console.log(createClassgroup.coaches);
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

  private getCoaches() {
    return this.coachService.getAllCoaches()
      .subscribe(coaches => {
        const connectedCoach = coaches.filter(coach => coach.id === this.authenticatedCoachId)[0];
        this.coachesToAdd.push(connectedCoach);
        this.coaches = coaches.filter(coach => coach.id !== this.authenticatedCoachId);
      });
  }

  addCoachToCreationList(coachToAdd: Coach) {
    console.log(coachToAdd);
    this.coachesToAdd.push(coachToAdd);
    this.coaches = this.coaches.filter(coach => coach.id !== coachToAdd.id);
  }

  removeCoachFromCreationList(coachToRemove: Coach) {
    if (this.coachesToAdd.length !== 1) {
      this.coaches.push(coachToRemove);
      this.coachesToAdd = this.coachesToAdd.filter(coach => coach.id !== coachToRemove.id);
    }
    else {
      this.popupService.showPopup("Unable to remove coach : we need at least one coach to create a Class.", true);
    }
  }
}
