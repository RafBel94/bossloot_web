import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-storageform-table',
  imports: [],
  templateUrl: './storageform-table.component.html',
  styleUrl: './storageform-table.component.scss'
})
export class StorageformTableComponent {
  @Input() uploadForm!: FormGroup;
  @Input() brand!: string | null;
}
