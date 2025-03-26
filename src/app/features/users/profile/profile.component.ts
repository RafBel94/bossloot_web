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
  selectedFile: File | null = null;
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
    profile_picture: new FormControl(''),
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
          profile_picture: res.data.profile_picture
        });
        this.cdr.detectChanges();
        console.log(res.data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedUser.patchValue({
          profile_picture: e.target.result
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
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
    const formData = new FormData();
    const formValues = this.editedUser.getRawValue();

    // Required fields
    formData.append('_method', 'PUT');
    formData.append('name', formValues.name ?? '');
    formData.append('email', formValues.email ?? '');
    formData.append('level', (formValues.level ?? 1).toString());
    formData.append('points', (formValues.points ?? 0).toString());

    // Send booleans as '1'/'0' which Laravel can easily convert
    formData.append('email_confirmed', formValues.email_confirmed ? '1' : '0');
    formData.append('activated', formValues.activated ? '1' : '0');

    // Optional fields - always send but can be empty
    formData.append('mobile_phone', formValues.mobile_phone ?? '');
    formData.append('adress_1', formValues.adress_1 ?? '');
    formData.append('adress_2', formValues.adress_2 ?? '');

    // Profile Image
    if (this.selectedFile) {
      formData.append('profile_picture', this.selectedFile);
    }

    this.userService.updateUser(userId, formData).subscribe({
      next: (res: any) => {
        this.errorMsg = '';
        this.router.navigate(['/dashboard/users']);
      },
      error: (err: any) => {
        console.error('Full error:', err);
        if (err.error?.errors) {
          this.errorMsg = Object.values(err.error.errors).flat().join('\n');
        } else {
          this.errorMsg = err.message || 'Error updating user';
        }
      }
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard/users']);
  }
}

