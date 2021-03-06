import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoContentComponent } from './no-content/no-content.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { DetailsComponent } from './details/details.component';
import { SingleCardComponent } from './single-card/single-card.component';
import { UserRoutingModule } from './user-management-routing.module';
import { UserComponent } from './user.component';

/**
 * the Home Module decorator that contains user Management Components Services ....
 */
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TranslateModule,
    CommonModule,
    UserRoutingModule
  ],
  declarations: [ListComponent, AddEditComponent, NoContentComponent, DetailsComponent, SingleCardComponent, UserComponent]
})
export class UserManagementModule { }
