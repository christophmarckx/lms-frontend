import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {AddCourseFormComponent} from "./add-course-form/add-course-form.component";
import {AddClassgroupFormComponent} from "./add-classgroup-form/add-classgroup-form.component";
import {UpdateCourseFormComponent} from "./update-course-form/update-course-form.component";
import {ModuleGalleryComponent} from "./module-gallery/module-gallery.component";
import {AddModuleFormComponent} from "./add-module-form/add-module-form.component";
import {AddCodelabFormComponent} from "./add-codelab-form/add-codelab-form.component";
import {authGuard} from "./authentication/auth.guard";
import {ClassgroupOverviewComponent} from "./classgroup-overview/classgroup-overview.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {ViewCoursesComponent} from "./course-gallery/view-courses.component";
import {ViewCodelabComponent} from "./view-codelab/view-codelab.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'courses/add-course',
    component: AddCourseFormComponent
  },
  {
    path: 'courses',
    component: ViewCoursesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'modules/add-module',
    component: AddModuleFormComponent
  },
  {
    path: 'codelabs/add-codelabs',
    component: AddCodelabFormComponent
  },
  {
    path: 'add-classgroup',
    component: AddClassgroupFormComponent
  },
  {
    path: 'modules',
    component: ModuleGalleryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'update-course/:id',
    component: UpdateCourseFormComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'classgroups/:classgroupId',
    component: ClassgroupOverviewComponent,
    canActivate: [authGuard]
  },
  {
    path: 'codelabs/:id',
    component: ViewCodelabComponent,
    canActivate: [authGuard]
  }
];
