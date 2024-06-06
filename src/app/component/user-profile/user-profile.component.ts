import {Component, inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {StudentService} from "../../services/student/student.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ClassgroupService} from "../../services/classgroup/classgroup.service";
import {Classgroup} from "../../models/classgroup/classgroup";
import { UserRole } from '../../models/authentication/authenticated-user';
import {ClassgroupCardComponent} from "./classgroup-card/classgroup-card.component";
import {PopupService} from "../../services/popup/popup.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterLink,
    ClassgroupCardComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  private readonly popupService: PopupService = inject(PopupService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly studentService: StudentService = inject(StudentService);
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);
  private readonly classgroupService: ClassgroupService = inject(ClassgroupService);
  public isFormInvalid: boolean = true;
  public formControlNames : string[] = ['classgroup'];
  public enrollFormError?: string;
  enrollClassgroupForm: FormGroup;
  user: any;
  // @Input() id: string;
  classgroups: Classgroup[] = [];

  ngOnInit() {
    this.enrollClassgroupForm = this.formBuilder.group({
      classgroup: ['', [Validators.required]]
    })

    this.authenticationService.getAuthenticatedUser().subscribe(user => this.user = user);
    this.getClassgroupsForUser(this.user.id);
  }

  private getClassgroupsForUser(userId: string) {
    this.classgroupService.getAllClassgroupsForUserId(userId).subscribe(classgroups => this.classgroups = classgroups);
  }

  private getStudentById() {
    this.studentService.getStudentById().subscribe(
      student => this.user = student
    );
  }

  protected readonly UserRole = UserRole;

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

