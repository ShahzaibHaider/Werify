import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientComponent } from './recipient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { CertWalletComponent } from './cert-wallet/cert-wallet.component';
import { InboxComponent } from './inbox/inbox.component';
import { ViewEmployersComponent } from './view-employers/view-employers.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewJobComponent } from './jobs-list/view-job/view-job.component';
import { NoInboxSelectedComponent } from './inbox/no-inbox-selected/no-inbox-selected.component';
import { InboxMessagesComponent } from './inbox/inbox-messages/inbox-messages.component';
import { CertificateViewComponent } from './cert-wallet/certificate-view/certificate-view.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ViewEmployerComponent } from './view-employers/view-employer/view-employer.component';
import { HiringOffersComponent } from './hiring-offers/hiring-offers.component';

const routes: Routes = [
  {
    path: '', component: RecipientComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'find_jobs', component: JobsListComponent },
      { path: 'find_jobs/:job_id', component: ViewJobComponent },
      { path: 'certificate_wallet', component: CertWalletComponent },
      { path: 'certificate_wallet/:certificate_number', component: CertificateViewComponent },
      {
        path: 'inbox', component: InboxComponent, children: [
          { path: '', component: NoInboxSelectedComponent },
          { path: ':inbox_id', component: InboxMessagesComponent },
        ]
      },
      { path: 'hiring_offers', component: HiringOffersComponent },
      { path: 'view_employers', component: ViewEmployersComponent },
      { path: 'view_employers/:username', component: ViewEmployerComponent },
      { path: 'applications', component: ApplicationsComponent },
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
export class RecipientRoutingModule { }
