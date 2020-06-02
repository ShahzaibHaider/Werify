import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { RecipientRoutingModule } from './recipient-routing.module';
import { RecipientComponent } from './recipient.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { CertWalletComponent } from './cert-wallet/cert-wallet.component';
import { ViewEmployersComponent } from './view-employers/view-employers.component';
import { InboxComponent } from './inbox/inbox.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewJobComponent } from './jobs-list/view-job/view-job.component';
import { NoInboxSelectedComponent } from './inbox/no-inbox-selected/no-inbox-selected.component';
import { InboxMessagesComponent } from './inbox/inbox-messages/inbox-messages.component';
import { CertificateViewComponent } from './cert-wallet/certificate-view/certificate-view.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ViewEmployerComponent } from './view-employers/view-employer/view-employer.component';
import { HiringOffersComponent } from './hiring-offers/hiring-offers.component';


@NgModule({
  declarations: [RecipientComponent, JobsListComponent, CertWalletComponent, ViewEmployersComponent, InboxComponent, EditProfileComponent, DashboardComponent, ViewJobComponent, NoInboxSelectedComponent, InboxMessagesComponent, CertificateViewComponent, ChangePasswordComponent, FeedbackComponent, ApplicationsComponent, ViewEmployerComponent, HiringOffersComponent],
  imports: [
    CommonModule,
    RecipientRoutingModule,
    FormsModule
  ]
})
export class RecipientModule { }
