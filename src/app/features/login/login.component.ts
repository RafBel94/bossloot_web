import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  authService = inject(AuthService);
  router = inject(Router);

  onLogin() {
    if (this.loginUser.invalid) {
      this.loginErrorMsg = 'Please fill in all required fields.';
      return;
    }

    const userData = this.loginUser.value;
    this.authService.loginUser(userData.email!, userData.password!).subscribe({
      next: (res: any) => {
        if (res.success) {

          if (res.data.role !== 'admin') {
            this.loginErrorMsg = 'You are not authorized to access this page.';
            return;
          }

          this.loginErrorMsg = '';
          localStorage.setItem('bosslootUsername', res.data.name);
          localStorage.setItem('bosslootUser', res.data.id);
          localStorage.setItem('bosslootToken', res.data.token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        this.loginErrorMsg = err.error.data.error;
      }
    });
  }
}
