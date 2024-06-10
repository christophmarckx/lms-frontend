import {Component, inject, Input, OnInit} from '@angular/core';
import {PopupService} from "../../../services/popup/popup.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
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
  private readonly route: Router = inject(Router);
  private readonly classgroupService: ClassgroupService = inject(ClassgroupService);
  public formControlNames: string[] = ['classgroup'];
  public enrollFormError?: string;
  @Input() enrolledClassGroup: Classgroup;
  selectedClassgroupId: string;
  classgroups: Classgroup[];
  user: any;

  ngOnInit() {
    this.getClassGroups().subscribe(cg => {
      this.classgroups = cg;
      this.selectedClassgroupId = this.enrolledClassGroup.id
    });
  }

  private getClassGroups(): Observable<Classgroup[]> {
    return this.classgroupService.getAllClassgroups()
  }


  registerToClassGroup(): void {
    console.log(this.selectedClassgroupId);
    this.classgroupService.enrollStudent(this.selectedClassgroupId).subscribe({
      next: reponse => {

        this.popupService.showPopup(`You've registered!`);

        this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate(['/profile']);
        });
      },
      error: err => {
        this.enrollFormError = err.error.errors;
      }
    });
  }
}
