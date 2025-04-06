import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisplayProduct } from '../../../../../models/products/DisplayProduct';

@Component({
  selector: 'app-displayform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './displayform.component.html',
  styleUrl: './displayform.component.scss'
})
export class DisplayformComponent {
  @Input() productData!: DisplayProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('resolution', new FormControl(this.productData?.resolution || '1920x1080', [Validators.required]));

    this.uploadForm.addControl('refresh_rate', new FormControl(this.productData?.refresh_rate || 60, [Validators.required, Validators.min(30), Validators.max(240)]));

    this.uploadForm.addControl('response_time', new FormControl(this.productData?.response_time || 1, [Validators.required, Validators.min(1), Validators.max(10)]));

    this.uploadForm.addControl('panel_type', new FormControl(this.productData?.panel_type || 'IPS', [Validators.required]));

    this.uploadForm.addControl('aspect_ratio', new FormControl(this.productData?.aspect_ratio || '16:9', [Validators.required]));

    this.uploadForm.addControl('curved', new FormControl(this.productData?.curved || false, [Validators.required]));

    this.uploadForm.addControl('brightness', new FormControl(this.productData?.brightness || 250, [Validators.required, Validators.min(100), Validators.max(1000)]));

    this.uploadForm.addControl('contrast_ratio', new FormControl(this.productData?.contrast_ratio || '1000:1', [Validators.required]));

    this.uploadForm.addControl('sync_type', new FormControl(this.productData?.sync_type || 'G-Sync', [Validators.required]));

    this.uploadForm.addControl('hdmi_ports', new FormControl(this.productData?.hdmi_ports || 1, [Validators.required, Validators.min(1), Validators.max(5)]));

    this.uploadForm.addControl('display_ports', new FormControl(this.productData?.display_ports || 1, [Validators.required, Validators.min(1), Validators.max(5)]));

    this.uploadForm.addControl('inches', new FormControl(this.productData?.inches || 24, [Validators.required, Validators.min(10), Validators.max(50)]));

    this.uploadForm.addControl('weight', new FormControl(this.productData?.weight || 5.5, [Validators.required, Validators.min(1), Validators.max(20)]));
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('resolution');
    this.uploadForm.removeControl('refresh_rate');
    this.uploadForm.removeControl('response_time');
    this.uploadForm.removeControl('panel_type');
    this.uploadForm.removeControl('aspect_ratio');
    this.uploadForm.removeControl('curved');
    this.uploadForm.removeControl('brightness');
    this.uploadForm.removeControl('contrast_ratio');
    this.uploadForm.removeControl('sync_type');
    this.uploadForm.removeControl('hdmi_ports');
    this.uploadForm.removeControl('display_ports');
    this.uploadForm.removeControl('inches');
    this.uploadForm.removeControl('weight');
  }
}
