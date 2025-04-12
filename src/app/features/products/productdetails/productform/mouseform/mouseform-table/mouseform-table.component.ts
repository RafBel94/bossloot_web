import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mouseform-table',
  imports: [],
  templateUrl: './mouseform-table.component.html',
  styleUrl: './mouseform-table.component.scss'
})
export class MouseformTableComponent {
  @Input() uploadForm!: FormGroup;
  @Input() brand!: string | null;
}
