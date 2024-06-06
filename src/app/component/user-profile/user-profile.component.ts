import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {StudentService} from "../../services/student/student.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ClassgroupService} from "../../services/classgroup/classgroup.service";
import {Classgroup} from "../../models/classgroup/classgroup";
import { UserRole } from '../../models/authentication/authenticated-user';
import {ClassgroupCardComponent} from "../classgroup-gallery/classgroup-card/classgroup-card.component";
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterLink,
    ClassgroupCardComponent,
    LoadingSpinnerComponent
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
  classgroups: Classgroup[];

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.userId = params.get('id');
    // })
    this.authenticationService.getAuthenticatedUser().subscribe(user => this.user = user);
    this.getClassgroupsForUser(this.user.id).subscribe(classgroups => this.classgroups = classgroups);
  }

  private getClassgroupsForUser(userId: string) {
    return this.classgroupService.getAllClassgroupsForUserId(userId);
  }

  private getStudentById() {
    this.studentService.getStudentById().subscribe(
      student => this.user = student
    );
  }

  protected readonly UserRole = UserRole;
}
