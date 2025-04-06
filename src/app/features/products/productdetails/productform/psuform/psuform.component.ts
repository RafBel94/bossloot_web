import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PsuProduct } from '../../../../../models/products/PsuProduct';

@Component({
  selector: 'app-psuform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './psuform.component.html',
  styleUrl: './psuform.component.scss'
})
export class PsuformComponent {
  @Input() productData!: PsuProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('efficiency_rating', new FormControl(this.productData?.efficiency_rating || '80+ Bronze', [Validators.required]));

    this.uploadForm.addControl('wattage', new FormControl(this.productData?.wattage || 100, [Validators.required, Validators.min(100), Validators.max(1500)]));

    this.uploadForm.addControl('modular', new FormControl(this.productData?.modular || false, [Validators.required]));

    this.uploadForm.addControl('fanless', new FormControl(this.productData?.fanless || false, [Validators.required]));
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('efficiency_rating');
    this.uploadForm.removeControl('wattage');
    this.uploadForm.removeControl('modular');
    this.uploadForm.removeControl('fanless');
  }
}
