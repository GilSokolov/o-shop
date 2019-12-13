import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    SharedModule,
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
  ]
})
export class CoreModule { }
