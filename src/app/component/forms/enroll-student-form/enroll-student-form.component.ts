import {Component, inject, Input, OnInit} from '@angular/core';
import {PopupService} from "../../../services/popup/popup.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ClassgroupService} from "../../../services/classgroup/classgroup.service";
import {Classgroup} from "../../../models/classgroup/classgroup";
import {Observable} from "rxjs";
import {ProcessErrorPipe} from "../../../pipe/process-error.pipe";
import {LoadingSpinnerComponent} from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-enroll-student-form',
  standalone: true,
  imports: [
    FormsModule,
    ProcessErrorPipe,
    ReactiveFormsModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './enroll-student-form.component.html',
  styleUrl: './enroll-student-form.component.css'
})
export class EnrollStudentFormComponent implements OnInit {
  private readonly popupService: PopupService = inject(PopupService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly classgroupService: ClassgroupService = inject(ClassgroupService);
  public isFormInvalid: boolean = true;
  public formControlNames: string[] = ['classgroup'];
  public enrollFormError?: string;
  @Input() enrolledClassGroup: Classgroup;
  enrollClassgroupForm: FormGroup;
  classgroups: Classgroup[];
  user: any;

  ngOnInit() {
    this.enrollClassgroupForm = this.formBuilder.group({
      classgroup: ['', [Validators.required]]
    })
    this.getClassGroups().subscribe(cg => {
      this.classgroups = cg;
      if (this.enrolledClassGroup){
        this.enrollClassgroupForm.patchValue({
          classgroup: this.enrolledClassGroup.id,
        })
      }
    });
  }

  private getClassGroups(): Observable<Classgroup[]> {
    return this.classgroupService.getAllClassgroups()
  }

  onFormUpdate() {
    this.isFormInvalid = this.enrollClassgroupForm.invalid;
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.enrollClassgroupForm.controls[controlName as keyof typeof this.enrollClassgroupForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.enrollClassgroupForm.controls[controlName as keyof typeof this.enrollClassgroupForm.controls].hasError(errorName);
  }

  registerToClassGroup(): void {
    if (this.isFormInvalid) {
      alert('The data you inserted is invalid. Try again!');
      return;
    }
    const rawValues = this.enrollClassgroupForm.getRawValue();
    const classGroupId = rawValues.classgroup!;

    this.classgroupService.enrollStudent(classGroupId).subscribe({
      next: reponse => {
        this.popupService.showPopup(`You've registered!`);
      },
      error: err => {
        this.enrollFormError = err.error.errors;
      }
    });
  }
}
