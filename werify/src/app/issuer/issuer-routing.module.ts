import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssuerComponent } from './issuer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CertificateDesignComponent } from './certificate-design/certificate-design.component';
import { IssueCertificateComponent } from './issue-certificate/issue-certificate.component';
import { CoursesComponent } from './courses/courses.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { ViewCourseComponent } from './courses/view-course/view-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {
    path: '', component: IssuerComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'certificate_design', component: CertificateDesignComponent },
      { path: 'issue_certificate', component: IssueCertificateComponent },
      { path: 'recipients', component: RecipientsComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/add_course', component: AddCourseComponent },
      { path: 'courses/edit_course/:course_id', component: EditCourseComponent },
      { path: 'edit_profile', component: EditProfileComponent },
      { path: 'change_password', component: ChangePasswordComponent },
      { path: 'feedback', component: FeedbackComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuerRoutingModule { }
