import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [UserProfileComponent]
})
export class HomeModule { }
