import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { RequestsComponent } from './requests/requests.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { OrganizationsComponent } from './organizations/organizations.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'organizations', component: OrganizationsComponent },
      { path: 'recipients', component: RecipientsComponent },
      { path: 'feedbacks', component: FeedbacksComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'requests', component: RequestsComponent },
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
