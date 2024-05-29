import {Component, OnInit} from '@angular/core';
import {Course} from "../models/Course";
import {CourseService} from "../services/course/course.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-course-form',
  standalone: true,
  imports: [],
  templateUrl: './update-course-form.component.html',
  styleUrl: './update-course-form.component.css'
})
export class UpdateCourseFormComponent implements OnInit {

  public formControlNames: string[] = ['name'];
  public isFormInvalid: boolean = true;
  public updateCourseNameError?: string;
  public courseId: string;

  getCourseById(courseId: string): Course {
    return this.courseService.getCourseById(courseId);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') === null) {
        this.router.navigate(['']);
      }
      this.courseId = params.get('id')!;
      this.getCourseById(this.courseId);
    })
  }

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.updateCourseNameForm.valueChanges.subscribe(() => this.onFormUpdate())
  }

  updateCourseNameForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
  });

  onFormUpdate() {
    this.isFormInvalid = this.updateCourseNameForm.invalid || !this.updateCourseNameForm.touched;
  }


updateCourseName(){
  if(this.isFormInvalid){
    alert('The data that you inserted is not valid. Try again!');

  }
}
}

