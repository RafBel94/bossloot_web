import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageProduct } from '../../../../../models/products/StorageProduct';

@Component({
  selector: 'app-storageform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './storageform.component.html',
  styleUrl: './storageform.component.scss'
})
export class StorageformComponent {
  @Input() productData!: StorageProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('type', new FormControl(this.productData?.type || 'SSD', [Validators.required]));

    this.uploadForm.addControl('capacity', new FormControl(this.productData?.capacity || 120, [Validators.required, Validators.min(120), Validators.max(32000)]));

    this.uploadForm.addControl('rpm', new FormControl(this.productData?.rpm || 0, [Validators.min(0), Validators.max(7200)]));

    this.uploadForm.addControl('read_speed', new FormControl(this.productData?.read_speed || 3000, [Validators.required, Validators.min(100), Validators.max(14000)]));

    this.uploadForm.addControl('write_speed', new FormControl(this.productData?.write_speed || 2000, [Validators.required, Validators.min(100), Validators.max(12000)]));

    this.setupRPMLogic();
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('type');
    this.uploadForm.removeControl('capacity');
    this.uploadForm.removeControl('rpm');
    this.uploadForm.removeControl('read_speed');
    this.uploadForm.removeControl('write_speed');
  }

  setupRPMLogic() {
    const typeControl = this.uploadForm.get('type');
    const rpmControl = this.uploadForm.get('rpm');

    if(typeControl?.value === 'SSD') {
      rpmControl?.setValue(0);
      rpmControl?.disable();
    }

    if (typeControl && rpmControl) {
      typeControl.valueChanges.subscribe((value: string) => {
        if (value === 'SSD') {
          rpmControl.setValue(0);
          rpmControl.disable();
        } else {
          rpmControl.enable();
        }
      });
    }
  }
}
