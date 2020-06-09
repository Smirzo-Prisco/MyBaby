import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenMultimediaPageRoutingModule } from './open-multimedia-routing.module';

import { OpenMultimediaPage } from './open-multimedia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenMultimediaPageRoutingModule
  ],
  declarations: [OpenMultimediaPage]
})
export class OpenMultimediaPageModule {}
