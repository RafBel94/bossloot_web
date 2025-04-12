import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-motherboardform-table',
  imports: [],
  templateUrl: './motherboardform-table.component.html',
  styleUrl: './motherboardform-table.component.scss'
})
export class MotherboardformTableComponent {
  @Input() uploadForm!: FormGroup;
  @Input() brand!: string | null;
}
