import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AddCourseFormComponent} from "./add-course-form/add-course-form.component";
import {AddClassgroupFormComponent} from "./add-classgroup-form/add-classgroup-form.component";
import {ModuleGalleryComponent} from "./module-gallery/module-gallery.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add-course', component: AddCourseFormComponent},
  {path: 'add-classgroup', component: AddClassgroupFormComponent},
  {path: 'modules', component: ModuleGalleryComponent}
];