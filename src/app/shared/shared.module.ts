import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
