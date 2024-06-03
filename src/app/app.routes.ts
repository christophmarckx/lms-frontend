import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {AddCourseFormComponent} from "./add-course-form/add-course-form.component";
import {AddClassgroupFormComponent} from "./add-classgroup-form/add-classgroup-form.component";
import {UpdateCourseFormComponent} from "./update-course-form/update-course-form.component";
import {ModuleGalleryComponent} from "./module-gallery/module-gallery.component";
import {AddModuleFormComponent} from "./add-module-form/add-module-form.component";
import {ViewStudentProfileComponent} from "./view-student-profile/view-student-profile.component";
import {AddCodelabFormComponent} from "./add-codelab-form/add-codelab-form.component";
import {ClassgroupOverviewComponent} from "./classgroup-overview/classgroup-overview.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add-course', component: AddCourseFormComponent},
  {path: 'modules/add-module', component: AddModuleFormComponent},
  {path: 'codelabs/add-codelabs', component: AddCodelabFormComponent},
  {path: 'add-classgroup', component: AddClassgroupFormComponent},
  {path: 'modules', component: ModuleGalleryComponent},
  {path: 'update-course/:id', component: UpdateCourseFormComponent},
  {path: 'students/:id',component: ViewStudentProfileComponent },
  {path: 'classgroup/:classgroupId', component: ClassgroupOverviewComponent}
];
