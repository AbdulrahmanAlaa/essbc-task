import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pages } from '../config/pages-config';
import { UserComponent } from './user.component';
import { AddEditComponent } from './add-edit/add-edit.component';

/**
 * the user Routing Module routes that contains needed all module CRUD operations routs
 */
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: pages.userManagement.children.list.path,
        component: ListComponent
      },
      {
        path: pages.userManagement.children.add.path,
        component: AddEditComponent
      },
      {
        path: pages.userManagement.children.delete.path,
        component: DetailsComponent
      },
      {
        path: pages.userManagement.children.edit.path,
        component: AddEditComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
