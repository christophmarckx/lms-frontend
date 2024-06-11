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
import {coachGuard} from "./authentication/coach.guard";
import {UpdateCodelabFormComponent} from "./component/forms/update-codelab-form/update-codelab-form.component";
import {CourseOverviewComponent} from "./component/course-overview/course-overview.component";
import {ProgressOverviewComponent} from "./component/progress-overview/progress-overview.component";


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
    canActivate: [coachGuard]
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
    canActivate: [coachGuard]
  },
  {
    path: 'courses/:id',
    component: CourseOverviewComponent,
    canActivate: [authGuard]
  },
  {
    path: 'courses/:id/update-course',
    component: UpdateCourseFormComponent,
    canActivate: [coachGuard]
  },
  {
    path: 'modules',
    component: ModuleGalleryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'modules/add-module',
    component: AddModuleFormComponent,
    canActivate: [coachGuard]
  },
  {
    path: 'codelabs',
    component: CodelabGalleryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'codelabs/add-codelab',
    component: AddCodelabFormComponent,
    canActivate: [coachGuard]
  },
  {
    path: 'codelabs/:id',
    component: ViewCodelabComponent,
    canActivate: [authGuard]
  },
  {
    path: 'codelabs/:id/update-codelab',
    component: UpdateCodelabFormComponent,
    canActivate: [coachGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'students/:studentId',
    component: UserProfileComponent,
    canActivate: [authGuard, coachGuard]
  },
  {
    path: 'progress-overview',
    component: ProgressOverviewComponent,
    canActivate: [coachGuard]
  }
];
