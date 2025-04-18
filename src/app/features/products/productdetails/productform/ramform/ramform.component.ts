import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RamProduct } from '../../../../../models/products/RamProduct';

@Component({
  selector: 'app-ramform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './ramform.component.html',
  styleUrl: './ramform.component.scss'
})
export class RamformComponent {
  @Input() productData!: RamProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('speed', new FormControl(this.productData?.speed || 800, [Validators.required, Validators.min(800), Validators.max(6000)]));

    this.uploadForm.addControl('memory', new FormControl(this.productData?.memory || 4, [Validators.required, Validators.max(256)]));

    this.uploadForm.addControl('memory_type', new FormControl(this.productData?.memory_type || 'DDR4', [Validators.required]));

    this.uploadForm.addControl('latency', new FormControl(this.productData?.latency || 17, [Validators.required , Validators.min(7), Validators.max(40)]));
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('speed');
    this.uploadForm.removeControl('memory');
    this.uploadForm.removeControl('memory_type');
    this.uploadForm.removeControl('latency');
  }
}
