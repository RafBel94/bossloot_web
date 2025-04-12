import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cpuform-table',
  imports: [],
  templateUrl: './cpuform-table.component.html',
  styleUrl: './cpuform-table.component.scss'
})
export class CpuformTableComponent {
  @Input() uploadForm!: FormGroup;
  @Input() brand!: string | null;
}
