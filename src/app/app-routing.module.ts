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
const i=0;
//test table
import { TablePaginationComponent } from './table-pagination/table-pagination.component';

import { CookieService } from 'ngx-cookie-service';
import { AddTestComponent } from './add-test/add-test.component';
import { DeleteTestComponent } from './delete-test/delete-test.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { EditDetailComponent } from './edit-detail/edit-detail.component';
import { ScoresComponent } from './scores/scores.component';
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
  //  canActivate: [AuthGuard],     //ถ้ายังไม่ได้ login จะยังเข้าไม่ได้
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
          {
            path:'scores',
            component:ScoresComponent
          }
        ]
      },
      {
        path: 'manage-test',
        component: ManageTestComponent,
        children: [
          {
            path: '',
            //component: DeleteTestComponent,
           component: AddTestComponent,
          },
          {
            path:'Edit-Test',
            component:EditTestComponent
          },
          {
            path: 'Delete-Test',
            component: DeleteTestComponent,
          },
          {
            path: 'edit/:subjectChapCode',
            component: EditDetailComponent
          }
        ]
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
  providers: [AuthGuard,CookieService]
})
export class AppRoutingModule { }