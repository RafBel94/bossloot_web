import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyboardProduct } from '../../../../../models/products/KeyboardProduct';

@Component({
  selector: 'app-keyboardform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './keyboardform.component.html',
  styleUrl: './keyboardform.component.scss'
})
export class KeyboardformComponent {
  @Input() productData!: KeyboardProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('type', new FormControl(this.productData?.switch_type || 'Mechanical', [Validators.required]));

    this.uploadForm.addControl('switch_type', new FormControl(this.productData?.switch_type || 'Red', [Validators.required]));

    this.uploadForm.addControl('width', new FormControl(this.productData?.width || 350, [Validators.required, Validators.min(250), Validators.max(450)]));

    this.uploadForm.addControl('height', new FormControl(this.productData?.height || 30, [Validators.required, Validators.min(30), Validators.max(60)]));

    this.uploadForm.addControl('weight', new FormControl(this.productData?.weight || 800, [Validators.required, Validators.min(600), Validators.max(4000)]));
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('type');
    this.uploadForm.removeControl('switch_type');
    this.uploadForm.removeControl('width');
    this.uploadForm.removeControl('height');
    this.uploadForm.removeControl('weight');
  }
}
