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
import {CodelabGalleryComponent} from "./component/codelab-gallery/codelab-gallery.component";
import {ClassgroupGalleryComponent} from "./component/classgroup-gallery/classgroup-gallery.component";


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
    path: 'classgroups',
    component: ClassgroupGalleryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'classgroups/add-classgroup',
    component: AddClassgroupFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'classgroups/:classgroupId',
    component: ClassgroupOverviewComponent,
    canActivate: [authGuard]
  },
  {
    path: 'courses',
    component: ViewCoursesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'courses/add-course',
    component: AddCourseFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'courses/update-course/:id',
    component: UpdateCourseFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'modules',
    component: ModuleGalleryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'modules/add-module',
    component: AddModuleFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'codelabs',
    component: CodelabGalleryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'codelabs/add-codelab',
    component: AddCodelabFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'codelabs/:id',
    component: ViewCodelabComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard]
  },
];
