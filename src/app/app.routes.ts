import {Routes} from '@angular/router';
import {authGuard} from "./authentication/auth.guard";
import {HomeComponent} from "./component/home/home.component";
import {RegisterComponent} from "./component/register/register.component";
import {AddCourseFormComponent} from "./component/forms/add-course-form/add-course-form.component";
import {ViewCoursesComponent} from "./component/course-gallery/view-courses.component";
import {AddModuleFormComponent} from "./component/forms/add-module-form/add-module-form.component";
import {AddCodelabFormComponent} from "./component/forms/add-codelab-form/add-codelab-form.component";
import {AddClassgroupFormComponent} from "./component/forms/add-classgroup-form/add-classgroup-form.component";
import {ModuleGalleryComponent} from "./component/module-gallery/module-gallery.component";
import {UpdateCourseFormComponent} from "./component/forms/update-course-form/update-course-form.component";
import {UserProfileComponent} from "./component/user-profile/user-profile.component";
import {ClassgroupOverviewComponent} from "./component/classgroup-overview/classgroup-overview.component";
import {ViewCodelabComponent} from "./component/view-codelab/view-codelab.component";
import {CourseOverviewComponent} from "./component/course-overview/course-overview.component";


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
    path: 'courses/:courseId',
    component: CourseOverviewComponent,
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
