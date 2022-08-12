import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SingleCompanyComponent } from './single-company/single-company.component';
import { FrontofficeComponent } from './frontoffice.component';

const frontRoute: Routes = [
  { path: '', 
    component: FrontofficeComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'company/:id', component: SingleCompanyComponent },
      { path: '', redirectTo: "/home", pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(frontRoute)],
  exports: [
    RouterModule,
  ]
})
export class FrontofficeRoutingModule { }
