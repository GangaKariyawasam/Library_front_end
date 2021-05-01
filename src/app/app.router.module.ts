import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainMenuComponent} from './view/main-menu/main-menu.component';
import {StudentRegistrationComponent} from './view/dash-board/student-registration/student-registration.component';
import {SearchResultComponent} from './view/search-result/search-result.component';
import {DashBoardComponent} from './view/dash-board/dash-board.component';
import {FooterComponent} from "./view/footer/footer.component";
import {StudentProfileComponent} from "./view/student-profile/student-profile.component";
import {MainMenuGuard} from "./guards/main-menu.guard";
import {DashboardGuard} from "./guards/dashboard.guard";
import {StudentProfileGuard} from "./guards/student-profile.guard";
import {HomeComponent} from "./view/dash-board/home/home.component";
import {StudentComponent} from "./view/dash-board/student/student.component";
import { BookRegistrationComponent } from './view/dash-board/book-registration/book-registration.component';
import {AuthorRegistrationComponent} from "./view/author-registration/author-registration.component";
import {StepperComponent} from "./view/dash-board/stepper/stepper.component";
import {SettingComponent} from "./view/dash-board/setting/setting.component";
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main'
  },
  {
    component: MainMenuComponent,
    path: 'main',
    canActivate: [MainMenuGuard]
  },
  {
    component: StudentRegistrationComponent,
    path: 'student-registration'
  },
  {
    component: SearchResultComponent,
    path: 'search-book'
  },
  {
    component: StudentProfileComponent,
    path: 'student-profile',
    canActivate: [StudentProfileGuard]
  },
  {
    component: StepperComponent,
    path: 'stepper',
    canActivate: [StudentProfileGuard]
  },
  {
    component: SettingComponent,
    path: 'settings',
  },
  {path: 'book-registration',component: BookRegistrationComponent},
  {
    component: DashBoardComponent,
    path: 'dash-board',
    canActivate: [DashboardGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomeComponent},
      {path: 'student', component: StudentComponent},
      {path: 'book-registration',component: BookRegistrationComponent},
      {path: '**', pathMatch:'full', redirectTo: 'home'},
    ]
  },
  {
    component: FooterComponent,
    path: 'footer'
  },
  {
    path: '**',
    redirectTo: '/main'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
