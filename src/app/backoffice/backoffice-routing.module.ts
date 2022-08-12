import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BackofficeComponent } from './backoffice.component';
import { HomeCompanyComponent } from './home-company/home-company.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { ProfilComponent } from './profil/profil.component';
import { DemandeComponent } from './demande/demande.component';

import { AuthGuard } from '../cores/services/auth/auth.guard';

const routes: Routes = [
  { path: '', 
    component: BackofficeComponent,
    children: [
      { path: 'company',
        canActivate: [AuthGuard],
        data: {
          role: 'COMPANY'
        },
        component: HomeCompanyComponent 
      },
      { path: 'client',
        canActivate: [AuthGuard],
        data: {
          role: 'USER'
        },
        component: HomeClientComponent 
      },
      { path: 'profil',
        canActivate: [AuthGuard],
        data: {
          role: ['USER', 'COMPANY']
        },
        component: ProfilComponent 
      },
      { path: 'demandes',
        canActivate: [AuthGuard],
        data: {
          role: ['USER', 'COMPANY']
        },
        component: DemandeComponent 
      },
      { path: '', redirectTo: '/', pathMatch: 'full' },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackofficeRoutingModule { }
