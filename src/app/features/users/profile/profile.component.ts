import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  user: User | undefined;

  constructor() {
    const userId = Number(this.route.snapshot.params['id']);
    this.userService.getUserById(userId).subscribe({
      next: (res: any) => {
        this.user = res.data;
        this.cdr.detectChanges();
        console.log(this.user);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}

