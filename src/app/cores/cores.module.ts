import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoresRoutingModule } from './cores-routing.module';

import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { ImagePipe } from './pipes/image.pipe';

@NgModule({
  declarations: [
  
    ImagePipe
  ],
  imports: [
    CommonModule,
    CoresRoutingModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
})
export class CoresModule { }
