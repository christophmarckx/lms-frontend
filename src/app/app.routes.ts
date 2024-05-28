import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AddCourseFormComponent} from "./add-course-form/add-course-form.component";

export const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'add-course', component: AddCourseFormComponent}

];
