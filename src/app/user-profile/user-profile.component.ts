import {Component, inject, OnInit} from '@angular/core';
import {Student} from "../model/student/Student";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {StudentService} from "../services/student/student.service";
import {Coach} from "../model/coach/Coach";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {ClassgroupService} from "../services/classgroup/classgroup.service";
import {Classgroup} from "../models/Classgroup";
import {UserRole} from "../model/authentication/AuthenticatedUser";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly studentService: StudentService = inject(StudentService);
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);
  private readonly classgroupService: ClassgroupService = inject(ClassgroupService);
  user: any;
  classgroups: Classgroup[] = [];

  constructor() {

  }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.userId = params.get('id');
    // })
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
}