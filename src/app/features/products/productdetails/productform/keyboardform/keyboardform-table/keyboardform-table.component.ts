import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-keyboardform-table',
  imports: [],
  templateUrl: './keyboardform-table.component.html',
  styleUrl: './keyboardform-table.component.scss'
})
export class KeyboardformTableComponent {
  @Input() uploadForm!: FormGroup;
  @Input() brand!: string | null;
}
