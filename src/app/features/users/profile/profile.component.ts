import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  userService = inject(UserService);
  errorMsg = '';

  editedUser = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile_phone: new FormControl('', [Validators.pattern(/^[0-9]{9}$/)]),
    adress_1: new FormControl('', [Validators.maxLength(255)]),
    adress_2: new FormControl('', [Validators.maxLength(255)]),
    level: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(3), Validators.pattern(/^\d+$/)]),
    points: new FormControl(0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]),
    email_confirmed: new FormControl(false),
    activated: new FormControl(false),
  });

  constructor() {
    const userId = Number(this.route.snapshot.params['id']);
    this.userService.getUserById(userId).subscribe({
      next: (res: any) => {
        this.editedUser.patchValue({
          name: res.data.name,
          email: res.data.email,
          mobile_phone: res.data.mobile_phone,
          adress_1: res.data.adress_1,
          adress_2: res.data.adress_2,
          level: res.data.level,
          points: res.data.points,
          email_confirmed: res.data.email_confirmed,
          activated: res.data.activated,
        });
        this.cdr.detectChanges();
        console.log(res.data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  onUpdate() {
    if (!confirm('Are you sure you want to update the user?')) {
      return;
    }
    
    if (this.editedUser.invalid) {
      this.errorMsg = 'Please fix all the errors before updating an user.';
      return;
    }

    const userId = Number(this.route.snapshot.params['id']);
    this.userService.updateUser(userId, this.editedUser.value).subscribe({
      next: (res: any) => {
        this.errorMsg = '';
        this.router.navigate(['/dashboard/users']);
      },
      error: (err: any) => {
        this.errorMsg = err.error.data.error;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard/users']);
  }
}

