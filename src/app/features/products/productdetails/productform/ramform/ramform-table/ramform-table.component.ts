import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ramform-table',
  imports: [],
  templateUrl: './ramform-table.component.html',
  styleUrl: './ramform-table.component.scss'
})
export class RamformTableComponent {
  @Input() uploadForm!: FormGroup;


}
