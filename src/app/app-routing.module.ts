import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MultimediaService } from './services/resolvers/multimedia.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'app', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  // { path: 'gallery', loadChildren: () => import('./pages/gallery/gallery.module').then( m => m.GalleryPageModule) },
  // { path: 'timeline', loadChildren: () => import('./pages/timeline/timeline.module').then( m => m.TimelinePageModule) },
  {
    path: 'open-multimedia/:id/:type',
    resolve: { multimedia: MultimediaService },
    loadChildren: () => import('./pages/open-multimedia/open-multimedia.module').then( m => m.OpenMultimediaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
