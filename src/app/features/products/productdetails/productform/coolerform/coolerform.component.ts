import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoolerProduct } from '../../../../../models/products/CoolerProduct';

@Component({
  selector: 'app-coolerform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './coolerform.component.html',
  styleUrl: './coolerform.component.scss'
})
export class CoolerformComponent {
  @Input() productData!: CoolerProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('type', new FormControl(this.productData?.type || 'Air', [Validators.required]));
    this.uploadForm.addControl('fan_rpm', new FormControl(this.productData?.fan_rpm || 1200, [Validators.required, Validators.min(1000), Validators.max(3000)]));
    this.uploadForm.addControl('consumption', new FormControl(this.productData?.consumption || 5, [Validators.required, Validators.min(5), Validators.max(50)]));
    this.uploadForm.addControl('socket_support', new FormControl(this.productData?.socket_support || 'AM4', [Validators.required]));
    this.uploadForm.addControl('width', new FormControl(this.productData?.width || 120, [Validators.required, Validators.min(100), Validators.max(300)]));
    this.uploadForm.addControl('height', new FormControl(this.productData?.height || 150, [Validators.required, Validators.min(100), Validators.max(300)]));
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('type');
    this.uploadForm.removeControl('fan_rpm');
    this.uploadForm.removeControl('consumption');
    this.uploadForm.removeControl('socket_support');
    this.uploadForm.removeControl('width');
    this.uploadForm.removeControl('height');
  }
}
