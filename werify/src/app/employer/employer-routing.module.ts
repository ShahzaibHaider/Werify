import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerComponent } from './employer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FindRecipientsComponent } from './find-recipients/find-recipients.component';
import { InboxComponent } from './inbox/inbox.component';
import { JobsComponent } from './jobs/jobs.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewJobComponent } from './jobs/view-job/view-job.component';
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { NoInboxSelectedComponent } from './inbox/no-inbox-selected/no-inbox-selected.component';
import { InboxMessagesComponent } from './inbox/inbox-messages/inbox-messages.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EditJobComponent } from './jobs/edit-job/edit-job.component';
import { ViewRecipientComponent } from './find-recipients/view-recipient/view-recipient.component';
import { HireRequestComponent } from './hire-request/hire-request.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: '', component: EmployerComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'find_recipients', component: FindRecipientsComponent },
      { path: 'find_recipients/:username', component: ViewRecipientComponent },
      {
        path: 'inbox', component: InboxComponent, children: [
          { path: '', component: NoInboxSelectedComponent },
          { path: ':inbox_id', component: InboxMessagesComponent },
        ]
      },
      { path: 'hire_requests', component: HireRequestComponent },
      { path: 'employed', component: EmployeeComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'jobs/post_job', component: AddJobComponent },
      { path: 'jobs/:job_id', component: ViewJobComponent },
      { path: 'jobs/edit_job/:job_id', component: EditJobComponent },
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
export class EmployerRoutingModule { }
