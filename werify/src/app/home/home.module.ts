import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WhatIsWerifyComponent } from './what-is-werify/what-is-werify.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


@NgModule({
  declarations: [HomeComponent, WhatIsWerifyComponent, ContactUsComponent, AboutUsComponent, LoginComponent, RegisterComponent, LandingPageComponent, ForgotpasswordComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class HomeModule { }
