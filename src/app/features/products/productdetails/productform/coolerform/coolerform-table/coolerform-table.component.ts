import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coolerform-table',
  imports: [],
  templateUrl: './coolerform-table.component.html',
  styleUrl: './coolerform-table.component.scss'
})
export class CoolerformTableComponent {
  @Input() uploadForm!: FormGroup;
  @Input() brand!: string | null;
}
