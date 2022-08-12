import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./frontoffice/frontoffice.module').then(m => m.FrontofficeModule)
  },
  { 
    path: 'compte',
    loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackofficeModule)
  },
  // { 
  //   path: '**', 
  //   loadChildren: () => import('./cores/cores.module').then(m => m.CoresModule)
  // }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules}),
  ],  
  exports: [RouterModule],
  providers: [
  ],
})
export class AppRoutingModule { }
