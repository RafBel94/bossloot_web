import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-displayform-table',
  imports: [],
  templateUrl: './displayform-table.component.html',
  styleUrl: './displayform-table.component.scss'
})
export class DisplayformTableComponent {
  @Input() uploadForm!: FormGroup;
}
