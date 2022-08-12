import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ImagePipe } from '../cores/pipes/image.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    ImagePipe
  ],
  exports: [
    ImagePipe
    ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
