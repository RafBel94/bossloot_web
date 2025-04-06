import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MouseProduct } from '../../../../../models/products/MouseProduct';

@Component({
  selector: 'app-mouseform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './mouseform.component.html',
  styleUrl: './mouseform.component.scss'
})
export class MouseformComponent {
  @Input() productData!: MouseProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('dpi', new FormControl(this.productData?.dpi || 800, [Validators.required, Validators.min(600), Validators.max(20000)]));
    this.uploadForm.addControl('sensor', new FormControl(this.productData?.sensor || 'Optical', [Validators.required]));
    this.uploadForm.addControl('buttons', new FormControl(this.productData?.buttons || 3, [Validators.required, Validators.min(2), Validators.max(20)]));
    this.uploadForm.addControl('bluetooth', new FormControl(this.productData?.bluetooth || false, [Validators.required]));
    this.uploadForm.addControl('weight', new FormControl(this.productData?.weight || 70, [Validators.required, Validators.min(50), Validators.max(150)]));
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('dpi');
    this.uploadForm.removeControl('sensor');
    this.uploadForm.removeControl('buttons');
    this.uploadForm.removeControl('bluetooth');
    this.uploadForm.removeControl('weight');
  }
}
