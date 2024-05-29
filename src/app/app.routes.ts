import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AddCourseFormComponent} from "./add-course-form/add-course-form.component";
import {ModuleGalleryComponent} from "./module-gallery/module-gallery.component";

export const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'add-course', component: AddCourseFormComponent},
  {path: 'modules', component: ModuleGalleryComponent}

];
