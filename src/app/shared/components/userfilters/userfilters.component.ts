import { Component } from '@angular/core';

@Component({
  selector: 'app-userfilters',
  standalone: true,
  imports: [],
  templateUrl: './userfilters.component.html',
  styleUrl: './userfilters.component.scss'
})
export class UserfiltersComponent {
  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
