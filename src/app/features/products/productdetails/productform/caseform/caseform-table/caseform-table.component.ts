import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-caseform-table',
  imports: [],
  templateUrl: './caseform-table.component.html',
  styleUrl: './caseform-table.component.scss'
})
export class CaseformTableComponent {
  @Input() uploadForm!: FormGroup;
  @Input() brand!: string | null;
}
