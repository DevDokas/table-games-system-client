import { Component, DoCheck, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent implements DoCheck {

  loginForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.loginForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  ngDoCheck(): void {
    console.log(this.loginForm)
  }

  login() {

    console.log(this.loginForm.value)

    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
