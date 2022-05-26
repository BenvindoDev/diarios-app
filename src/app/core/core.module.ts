import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule} from '@angular/router';




@NgModule({
  declarations: [
  
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }

/*
* Guarda elemebtos de contexto global como serviços,
* navbar, models, etc.
*/ 
