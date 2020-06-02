import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SettingNewPasswordComponent } from './setting-new-password/setting-new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AdminLoginComponent,
    SettingNewPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
