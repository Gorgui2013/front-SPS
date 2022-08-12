import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { HomeCompanyComponent } from './home-company/home-company.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { ProfilComponent } from './profil/profil.component';
import { DemandeComponent } from './demande/demande.component';
// import { CompanyMapComponent } from '../frontoffice/signup/company-map/company-map.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BackofficeComponent,
    HomeCompanyComponent,
    HomeClientComponent,
    ProfilComponent,
    DemandeComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BackofficeModule { }
