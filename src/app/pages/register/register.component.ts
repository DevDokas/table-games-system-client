import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup

  user_id: any

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private storageService: StorageService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.user_id = this.storageService.getFromLocalStorage(this.storageService.userId)

      if (this.user_id) {
        this.router.navigate(['/'])
      }
    }

    this.registerForm = this.fb.group({
      login: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
    })
  }

  register() {
    const body = {
      login: this.registerForm.value.login,
      name: this.registerForm.value.name,
      password: this.registerForm.value.password
    }

    this.userService.register(body).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
}
