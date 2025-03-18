import { Component } from '@angular/core';
import { UserfiltersComponent } from '../../shared/components/userfilters/userfilters.component';
import { UserlistComponent } from '../../shared/components/userlist/userlist.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserfiltersComponent, UserlistComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  
}
