import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule
  ]
})
export class ProfileModule { }
