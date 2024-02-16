import { Component, DoCheck, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import * as jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent implements DoCheck {

  loginForm: FormGroup

  showPassword: string = 'password'

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private storageService: StorageService,
  ) {
    this.loginForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  ngDoCheck(): void {
    console.log(this.loginForm)
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  toggleShowPassword() {
    if (this.showPassword == 'password') {
      this.showPassword = 'text'
    } else if (this.showPassword == 'text') {
      this.showPassword = 'password'
    }
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        const decodedToken = this.getDecodedAccessToken(res.token)
        console.log(decodedToken)
        this.storageService.setInLocalStorage(this.storageService.userToken, res.token)
        this.storageService.setInLocalStorage(this.storageService.userId, decodedToken.sub)
        this.storageService.setInLocalStorage(this.storageService.userName, decodedToken.username)
        this.dialogRef.close()
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
