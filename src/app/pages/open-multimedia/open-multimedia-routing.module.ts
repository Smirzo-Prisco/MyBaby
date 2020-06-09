import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenMultimediaPage } from './open-multimedia.page';

const routes: Routes = [
  {
    path: '',
    component: OpenMultimediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenMultimediaPageRoutingModule {}
