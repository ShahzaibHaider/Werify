import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InboxComponent } from './inbox/inbox.component';
import { FindRecipientsComponent } from './find-recipients/find-recipients.component';
import { JobsComponent } from './jobs/jobs.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { ViewJobComponent } from './jobs/view-job/view-job.component';
import { InboxMessagesComponent } from './inbox/inbox-messages/inbox-messages.component';
import { NoInboxSelectedComponent } from './inbox/no-inbox-selected/no-inbox-selected.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EditJobComponent } from './jobs/edit-job/edit-job.component';
import { ViewRecipientComponent } from './find-recipients/view-recipient/view-recipient.component';
import { HireRequestComponent } from './hire-request/hire-request.component';
import { EmployeeComponent } from './employee/employee.component';


@NgModule({
  declarations: [EmployerComponent, DashboardComponent, InboxComponent, FindRecipientsComponent, JobsComponent, EditProfileComponent, AddJobComponent, ViewJobComponent, InboxMessagesComponent, NoInboxSelectedComponent, ChangePasswordComponent, FeedbackComponent, EditJobComponent, ViewRecipientComponent, HireRequestComponent, EmployeeComponent],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    FormsModule
  ]
})
export class EmployerModule { }
