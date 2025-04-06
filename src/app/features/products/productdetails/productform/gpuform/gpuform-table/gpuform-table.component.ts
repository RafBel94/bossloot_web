import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gpuform-table',
  imports: [],
  templateUrl: './gpuform-table.component.html',
  styleUrl: './gpuform-table.component.scss'
})
export class GpuformTableComponent {
  @Input() uploadForm!: FormGroup;
}
