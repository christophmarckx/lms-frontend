import {Component, OnInit} from '@angular/core';
import {Student} from "../model/student/Student";
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../services/student/student.service";

@Component({
  selector: 'app-view-student-profile',
  standalone: true,
  imports: [],
  templateUrl: './view-student-profile.component.html',
  styleUrl: './view-student-profile.component.css'
})
export class ViewStudentProfileComponent implements OnInit {

  student: Student;
  studentId: any;

  constructor(private route: ActivatedRoute, private studentService: StudentService) {

  }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.studentId = params.get('id');
    // })
    this.getStudentById();

  }

  private getStudentById() {
    this.studentService.getStudentById(this.studentId).subscribe(
      student => this.student = student
    );
  }

}
