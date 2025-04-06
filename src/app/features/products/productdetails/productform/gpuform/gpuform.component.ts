import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GpuProduct } from '../../../../../models/products/GpuProduct';

@Component({
  selector: 'app-gpuform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './gpuform.component.html',
  styleUrl: './gpuform.component.scss'
})
export class GpuformComponent {
  @Input() productData!: GpuProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('memory', new FormControl(this.productData?.memory || 2, [Validators.required, Validators.min(2), Validators.max(24)]));

    this.uploadForm.addControl('memory_type', new FormControl(this.productData?.memory_type || 'GDDR5', [Validators.required]));

    this.uploadForm.addControl('core_clock', new FormControl(this.productData?.core_clock || 800, [Validators.required, Validators.min(800), Validators.max(8000)]));

    this.uploadForm.addControl('boost_clock', new FormControl(this.productData?.boost_clock || 800, [Validators.min(800), Validators.max(8000)]));

    this.uploadForm.addControl('length', new FormControl(this.productData?.length || 80, [Validators.required, Validators.min(80), Validators.max(400)]));

    this.uploadForm.addControl('consumption', new FormControl(this.productData?.consumption || 120, [Validators.required, Validators.min(25), Validators.max(500)]));
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('memory');
    this.uploadForm.removeControl('memory_type');
    this.uploadForm.removeControl('core_clock');
    this.uploadForm.removeControl('boost_clock');
    this.uploadForm.removeControl('length');
    this.uploadForm.removeControl('consumption');
  }
}
