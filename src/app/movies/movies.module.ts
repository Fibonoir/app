import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MoviesModule { }
