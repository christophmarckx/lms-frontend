import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {StudentService} from "../../services/student/student.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Classgroup} from "../../models/classgroup/classgroup";
import {UserRole} from '../../models/authentication/authenticated-user';
import {EnrollStudentFormComponent} from "../forms/enroll-student-form/enroll-student-form.component";
import {Observable} from "rxjs";
import {ClassgroupCardComponent} from "../classgroup-gallery/classgroup-card/classgroup-card.component";
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";
import {UserService} from "../../services/user/user.service";
import {Student} from "../../models/student/student";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterLink,
    ClassgroupCardComponent,
    LoadingSpinnerComponent,
    EnrollStudentFormComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  @Input() studentId: string;
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);
  protected readonly UserRole = UserRole;
  private readonly userService: UserService = inject(UserService);
  user: any;
  classgroups: Classgroup[];
  showDropdown: boolean = false;

  ngOnInit() {
    if (this.studentId) {
      this.getStudentById(this.studentId).subscribe(student => {
        this.user = student;
        this.getClassgroupsForUser(this.user.id).subscribe(classgroups => this.classgroups = classgroups);
      })

    } else {
      this.authenticationService.getAuthenticatedUserAsObservable().subscribe(user => this.user = user);
      this.getClassgroupsForUser(this.user.id).subscribe(classgroups => this.classgroups = classgroups);
    }
  }

  private getClassgroupsForUser(userId: string): Observable<Classgroup[]> {
    return this.userService.getAllClassgroupsForUserId(userId);
  }

  private getStudentById(id: string): Observable<Student> {
    return this.userService.getStudentById(id);
  }
}
