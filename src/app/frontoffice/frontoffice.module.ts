import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FrontofficeComponent } from './frontoffice.component';
import { SingleCompanyComponent } from './single-company/single-company.component';
import { SpsmapComponent } from './spsmap/spsmap.component';
import { CompanyMapComponent } from './signup/company-map/company-map.component';

@NgModule({
  declarations: [

    SearchComponent,
    SigninComponent,
    SignupComponent,
    FrontofficeComponent,
    SingleCompanyComponent,
    SpsmapComponent,
    CompanyMapComponent,
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FrontofficeModule { }
