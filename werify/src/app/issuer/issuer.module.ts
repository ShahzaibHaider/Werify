import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { IssuerRoutingModule } from './issuer-routing.module';
import { IssuerComponent } from './issuer.component';
import { IssueCertificateComponent } from './issue-certificate/issue-certificate.component';
import { CoursesComponent } from './courses/courses.component';
import { CertificateDesignComponent } from './certificate-design/certificate-design.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { ViewCourseComponent } from './courses/view-course/view-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FeedbackComponent } from './feedback/feedback.component';


@NgModule({
  declarations: [IssuerComponent, IssueCertificateComponent, CoursesComponent, CertificateDesignComponent, RecipientsComponent, DashboardComponent, EditProfileComponent, AddCourseComponent, ViewCourseComponent, EditCourseComponent, ChangePasswordComponent, FeedbackComponent],
  imports: [
    CommonModule,
    IssuerRoutingModule,
    FormsModule
  ]
})
export class IssuerModule { }
