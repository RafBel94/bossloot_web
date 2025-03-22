import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './confirmemail.component.html',
  styleUrl: './confirmemail.component.scss'
})
export class ConfirmEmailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  message = this.route.snapshot.params['message'];

  title = this.route.snapshot.params['message'] === 'success' ? 'Email verified!' : 'Error!';
  userMessage = this.defineUserMessage(this.message);

  defineUserMessage(message: string) {
    switch (message) {
      case 'success':
        return 'Your email has been confirmed and you may now log in!';
      case 'notfound':
        return 'User not found.';
      case 'invalid':
        return 'Invalid confirmation link.';
      case 'alver':
        return 'Your email has already been confirmed.';
      default:
        return 'Invalid confirmation link.';
    }
  }
}
