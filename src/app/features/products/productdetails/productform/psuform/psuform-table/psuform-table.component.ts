import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-psuform-table',
  imports: [],
  templateUrl: './psuform-table.component.html',
  styleUrl: './psuform-table.component.scss'
})
export class PsuformTableComponent {
  @Input() uploadForm!: FormGroup;
  @Input() brand!: string | null;
}
