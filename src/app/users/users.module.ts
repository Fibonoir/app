import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatListModule
  ]
})
export class UsersModule { }
