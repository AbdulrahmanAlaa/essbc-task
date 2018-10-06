import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pages } from './config/pages-config';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: pages.home.path
  },
  {
    path: pages.home.path,
    loadChildren: 'src/app/home/home.module#HomeModule',
  }
  //,
  // {
  //   path: '**',
  //   component: PageNotFoundComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
