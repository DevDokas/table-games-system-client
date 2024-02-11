import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {

  loginForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }
}
