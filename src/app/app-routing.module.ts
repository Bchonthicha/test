import { GroupDetailComponent } from './group-detail/group-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlankComponent } from './blank/blank.component';
import { ManageStdGroupComponent } from './manage-std-group/manage-std-group.component';
import { TestComponent } from './test/test.component';
import { ManageTestComponent } from './manage-test/manage-test.component';
import { ReportOfStudentComponent } from './report-of-student/report-of-student.component';
import { ReportOfTestComponent } from './report-of-test/report-of-test.component';
import { TestStep1Component } from './test-step1/test-step1.component';
import { TestStep2Component } from './test-step2/test-step2.component';
import { TestStep3Component } from './test-step3/test-step3.component';
import { QuizComponent } from './quiz/quiz.component';
import { SignupComponent } from './signup/signup.component';
import { ReportsComponent} from './reports/reports.component';
import { StudentCheckComponent } from './student-check/student-check.component';
// Service
import { AuthService } from './services/auth.service';
// Guard
import { AuthGuard } from './guards/auth.guard';
//upload
import { FormUploadComponent } from './upload/form-upload/form-upload.component';

//test table
import { TablePaginationComponent } from './table-pagination/table-pagination.component';
const routes: Routes = [
  {
    path: '',      //เดิมเป็น path: ' '
    component: LoginComponent
  },
  {
    path:"table",
    component:TablePaginationComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],     //ถ้ายังไม่ได้ login จะยังเข้าไม่ได้
    children: [
      {
        path: '',
        component: BlankComponent,
      },
      {
        path: 'student-list',
        component: StudentListComponent,
      },
      {
        path: 'manage-std-group',
        component: ManageStdGroupComponent,
      },
      {
        path: 'group/:name',
        component: GroupDetailComponent
      },
      {
        path: 'test',
        component: TestComponent,
        children: [
          {
            path: '',
            component: TestStep1Component,
          },
          {
            path: 'test-step2',
            component: TestStep2Component,
          },
          {
            path: 'test-step3',
            component: TestStep3Component,
          },
          {
            path: 'quiz',
            component: QuizComponent,
          },
        ]
      },
      {
        path: 'manage-test',
        component: ManageTestComponent,
      },
      {
        path:'reports',
        component: ReportsComponent,
        // children: [
        //   {
        //     path: 'report-of-test',
        //     component: ReportOfTestComponent,
        //   },
        //   {
        //     path: 'report-of-student',
        //     component: ReportOfStudentComponent,
        //   }
        // ]
      },
      {
        path: 'student-check',
        component: StudentCheckComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }