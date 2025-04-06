import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CaseProduct } from '../../../../../models/products/CaseProduct';

@Component({
  selector: 'app-caseform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './caseform.component.html',
  styleUrl: './caseform.component.scss'
})
export class CaseformComponent {
  @Input() productData!: CaseProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('case_type', new FormControl(this.productData?.caseType || 'Mid Tower', [Validators.required]));

    this.uploadForm.addControl('form_factor_support', new FormControl(this.productData?.formFactorSupport || 'ATX', [Validators.required]));

    this.uploadForm.addControl('tempered_glass', new FormControl(this.productData?.temperedGlass || false, [Validators.required]));

    this.uploadForm.addControl('expansion_slots', new FormControl(this.productData?.expansionSlots || 7, [Validators.required, Validators.min(0), Validators.max(9)]));

    this.uploadForm.addControl('max_gpu_length', new FormControl(this.productData?.maxGpuLength || 300, [Validators.required, Validators.min(260), Validators.max(420)]));

    this.uploadForm.addControl('max_cpu_cooler_height', new FormControl(this.productData?.maxCpuCoolerHeight || 160, [Validators.required, Validators.min(145), Validators.max(180)]));

    this.uploadForm.addControl('radiator_support', new FormControl(this.productData?.radiatorSupport || false, [Validators.required]));

    this.uploadForm.addControl('extra_fans_connectors', new FormControl(this.productData?.extraFansConnectors || 3, [Validators.required, Validators.min(2), Validators.max(10)]));

    this.uploadForm.addControl('depth', new FormControl(this.productData?.depth || 180, [Validators.required, Validators.min(150), Validators.max(300)]));

    this.uploadForm.addControl('width', new FormControl(this.productData?.width || 210, [Validators.required, Validators.min(300), Validators.max(800)]));

    this.uploadForm.addControl('height', new FormControl(this.productData?.height || 120, [Validators.required, Validators.min(300), Validators.max(800)]));

    this.uploadForm.addControl('weight', new FormControl(this.productData?.weight || 7, [Validators.required, Validators.min(2), Validators.max(20)]));
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('case_type');
    this.uploadForm.removeControl('form_factor_support');
    this.uploadForm.removeControl('tempered_glass');
    this.uploadForm.removeControl('expansion_slots');
    this.uploadForm.removeControl('max_gpu_length');
    this.uploadForm.removeControl('max_cpu_cooler_height');
    this.uploadForm.removeControl('radiator_support');
    this.uploadForm.removeControl('extra_fans_connectors');
    this.uploadForm.removeControl('depth');
    this.uploadForm.removeControl('width');
    this.uploadForm.removeControl('height');
    this.uploadForm.removeControl('weight');
  }
}
