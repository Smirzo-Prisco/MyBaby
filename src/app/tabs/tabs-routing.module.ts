import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'timeline',
        loadChildren: () => import('../pages/timeline/timeline.module').then(m => m.TimelinePageModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('../pages/gallery/gallery.module').then(m => m.GalleryPageModule)
      },
      {
        path: 'tabs',
        redirectTo: 'timeline',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tabs',
    redirectTo: 'timeline',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
