import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import * as jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup

  showPassword: string = 'password'

  isLoggedIn: boolean = false

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
  ) {
    this.getUserId()

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

  getUserId() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = this.storageService.getFromLocalStorage(this.storageService.userId)
      if (userId) {
        this.isLoggedIn = true

        this.router.navigate(['/'])
      }
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
        //this.dialogRef.close()
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  redirectTo(url: string) {
    this.router.navigate([`${url}`])
  }
}
