import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { User } from '../../../interfaces/user';

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
  userId = 0;
  isLoading = true;

  uploadForm = new FormGroup({
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
    this.userId = this.route.snapshot.params['id'];
    this.loadUserData();
  }

  private loadUserData(): void {
    this.userService.getUserById(this.userId)
      .subscribe({
        next: (res: { data: User }) => {
          this.uploadForm.patchValue(res.data);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading user:', err);
          this.isLoading = false;
        }
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadForm.patchValue({
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
    this.isLoading = true;

    if (this.uploadForm.invalid) {
      this.errorMsg = 'Please fix all the errors before updating an user.';
      this.isLoading = false;
      return;
    }

    const formData = this.prepareFormData();

    this.userService.updateUser(this.userId, formData).subscribe({
      next: (res: any) => {
        this.errorMsg = '';
        this.router.navigate(['/dashboard/users']);
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Full error:', err);
        if (err.error?.errors) {
          this.errorMsg = Object.values(err.error.errors).flat().join('\n');
        } else {
          this.errorMsg = err.message || 'Error updating user';
        }
      }
    });
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    const formValues = this.uploadForm.getRawValue();

    formData.append('_method', 'PUT');
    formData.append('name', formValues.name ?? '');
    formData.append('email', formValues.email ?? '');
    formData.append('level', String(formValues.level ?? 1));
    formData.append('points', String(formValues.points ?? 0));
    formData.append('email_confirmed', formValues.email_confirmed ? '1' : '0');
    formData.append('activated', formValues.activated ? '1' : '0');
    formData.append('mobile_phone', formValues.mobile_phone ?? '');
    formData.append('adress_1', formValues.adress_1 ?? '');
    formData.append('adress_2', formValues.adress_2 ?? '');

    if (this.selectedFile) {
      formData.append('profile_picture', this.selectedFile);
    }

    return formData;
  }

  onCancel() {
    this.router.navigate(['/dashboard/users']);
  }
}

