import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ]
})
export class LoginDialogModule { }
