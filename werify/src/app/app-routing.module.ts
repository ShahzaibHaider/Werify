import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SettingNewPasswordComponent } from './setting-new-password/setting-new-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'issuer/:username', loadChildren: () => import('./issuer/issuer.module').then(m => m.IssuerModule) },
  { path: 'recipient/:username', loadChildren: () => import('./recipient/recipient.module').then(m => m.RecipientModule) },
  { path: 'employer/:username', loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule) },
  { path: 'admin/:username', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'admin_login', component: AdminLoginComponent },
  { path: ':user_type/:time_value/:username', component: SettingNewPasswordComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
