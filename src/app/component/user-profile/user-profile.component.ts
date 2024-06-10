import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {StudentService} from "../../services/student/student.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Classgroup} from "../../models/classgroup/classgroup";
import { UserRole } from '../../models/authentication/authenticated-user';
import {EnrollStudentFormComponent} from "../forms/enroll-student-form/enroll-student-form.component";
import {Observable} from "rxjs";
import {ClassgroupCardComponent} from "../classgroup-gallery/classgroup-card/classgroup-card.component";
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";
import {UserService} from "../../services/user/user.service";

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
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly studentService: StudentService = inject(StudentService);
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);
  private readonly userService: UserService = inject(UserService);
  protected readonly UserRole = UserRole;
  user: any;
  // @Input() id: string;
  classgroups: Classgroup[];

  ngOnInit() {
    this.authenticationService.getAuthenticatedUserAsObservable().subscribe(user => this.user = user);
    this.getClassgroupsForUser(this.user.id).subscribe(classgroups => this.classgroups = classgroups);
  }

  private getClassgroupsForUser(userId: string): Observable<Classgroup[]> {
    return this.userService.getAllClassgroupsForUserId(userId);
  }

  private getStudentById() {
    this.studentService.getStudentById().subscribe(
      student => this.user = student
    );
  }
}
