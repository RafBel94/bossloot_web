import { Component } from '@angular/core';
import { UserlistComponent } from '../../shared/components/userlist/userlist.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserlistComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  
}
