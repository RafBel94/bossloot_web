import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginUser = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  loginErrorMsg = '';

  loginService = inject(LoginService);
  router = inject(Router);

  onLogin() {
    if (this.loginUser.invalid) {
      this.loginErrorMsg = 'Please fill in all required fields.';
      return;
    }

    const userData = this.loginUser.value;
    this.loginService.loginUser(userData.email!, userData.password!).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.loginErrorMsg = '';
          localStorage.setItem('angular19User', res.data.userId);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        this.loginErrorMsg = err.error.data.error;
      }
    });
  }
}
