import { Component, Input } from '@angular/core';
import { CpuProduct } from '../../../../../models/products/CpuProduct';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cpuform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cpuform.component.html',
  styleUrl: './cpuform.component.scss'
})
export class CpuformComponent {
  @Input() productData!: CpuProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('socket', new FormControl(this.productData?.socket || 'AM4', [Validators.required]));

    this.uploadForm.addControl('core_count', new FormControl(this.productData?.core_count || 1, [Validators.required, Validators.min(1), Validators.max(16)]));

    this.uploadForm.addControl('thread_count', new FormControl(this.productData?.thread_count || 1, [Validators.required, Validators.min(1) , Validators.max(32)]));

    this.uploadForm.addControl('base_clock', new FormControl(this.productData?.base_clock || 800, [Validators.required, Validators.min(800), Validators.max(8000)]));

    this.uploadForm.addControl('boost_clock', new FormControl(this.productData?.boost_clock || 800, [Validators.required, Validators.min(800), Validators.max(8000)]));

    this.uploadForm.addControl('consumption', new FormControl(this.productData?.consumption || 45, [Validators.required, Validators.min(5), Validators.max(500)]));

    this.uploadForm.addControl('integrated_graphics', new FormControl(this.productData?.integrated_graphics || false, [Validators.required]));

    this.setupSocketDropdownLogic();
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('socket');
    this.uploadForm.removeControl('core_count');
    this.uploadForm.removeControl('thread_count');
    this.uploadForm.removeControl('base_clock');
    this.uploadForm.removeControl('boost_clock');
    this.uploadForm.removeControl('consumption');
    this.uploadForm.removeControl('integrated_graphics');
  }

  setupSocketDropdownLogic() {
    const socketControl = this.uploadForm.get('socket')!;
    const brandControl = this.uploadForm.get('brand')!;

    brandControl.valueChanges.subscribe((selectedBrand: string) => {
      if (selectedBrand === 'AMD') {
        socketControl.setValue('AM4');
      } else if (selectedBrand === 'Intel') {
        socketControl.setValue('LGA1200');
      }
    });
  }
}

