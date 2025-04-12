import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MotherboardProduct } from '../../../../../models/products/MotherboardProduct';

@Component({
  selector: 'app-motherboardform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './motherboardform.component.html',
  styleUrl: './motherboardform.component.scss'
})
export class MotherboardformComponent {
  @Input() productData!: MotherboardProduct;
  @Input() uploadForm!: FormGroup;

  ngOnInit() {
    this.uploadForm.addControl('socket', new FormControl(this.productData?.socket || 'AM4', [Validators.required]));

    this.uploadForm.addControl('chipset', new FormControl(this.productData?.chipset || 'B550', [Validators.required]));

    this.uploadForm.addControl('form_factor', new FormControl(this.productData?.form_factor || 'ATX', [Validators.required]));

    this.uploadForm.addControl('memory_max', new FormControl(this.productData?.memory_max || 32, [Validators.required, Validators.min(32), Validators.max(256)]));

    this.uploadForm.addControl('memory_slots', new FormControl(this.productData?.memory_slots || 2, [Validators.required, Validators.min(2), Validators.max(8)]));
    
    this.uploadForm.addControl('memory_type', new FormControl(this.productData?.memory_type || 'DDR3', [Validators.required]));

    this.uploadForm.addControl('memory_speed', new FormControl(this.productData?.memory_speed || 2100, [Validators.required, Validators.min(1000), Validators.max(7000)]));

    this.uploadForm.addControl('sata_ports', new FormControl(this.productData?.sata_ports || 2, [Validators.required, Validators.min(1), Validators.max(10)]));

    this.uploadForm.addControl('m_2_slots', new FormControl(this.productData?.m_2_slots || 0, [Validators.required, Validators.min(0), Validators.max(3)]));

    this.uploadForm.addControl('pcie_slots', new FormControl(this.productData?.pcie_slots || 1, [Validators.required, Validators.min(1), Validators.max(4)]));

    this.uploadForm.addControl('usb_ports', new FormControl(this.productData?.usb_ports || 2, [Validators.required, Validators.min(2), Validators.max(10)]));

    this.uploadForm.addControl('lan', new FormControl(this.productData?.lan || '1GbE', [Validators.required]));

    this.uploadForm.addControl('audio', new FormControl(this.productData?.audio || 'Realtek ALC1200', [Validators.required]));

    this.uploadForm.addControl('wifi', new FormControl(this.productData?.wifi || false, [Validators.required]));

    this.uploadForm.addControl('bluetooth', new FormControl(this.productData?.bluetooth || false, [Validators.required]));

    this.setupSocketDropdownLogic();
  }

  ngOnDestroy() {
    this.uploadForm.removeControl('memory');
    this.uploadForm.removeControl('memory_type');
    this.uploadForm.removeControl('core_clock');
    this.uploadForm.removeControl('boost_clock');
    this.uploadForm.removeControl('length');
    this.uploadForm.removeControl('consumption');
    this.uploadForm.removeControl('socket');
    this.uploadForm.removeControl('chipset');
    this.uploadForm.removeControl('form_factor');
    this.uploadForm.removeControl('memory_max');
    this.uploadForm.removeControl('memory_slots');
    this.uploadForm.removeControl('memory_type');
    this.uploadForm.removeControl('memory_speed');
    this.uploadForm.removeControl('sata_ports');
    this.uploadForm.removeControl('m_2_slots');
    this.uploadForm.removeControl('pcie_slots');
    this.uploadForm.removeControl('usb_ports');
    this.uploadForm.removeControl('lan');
    this.uploadForm.removeControl('audio');
    this.uploadForm.removeControl('wifi');
    this.uploadForm.removeControl('bluetooth');
  }

  private setupSocketDropdownLogic() {
    const socketControl = this.uploadForm.get('socket');
    const chipsetControl = this.uploadForm.get('chipset');

    socketControl?.valueChanges.subscribe((selectedSocket: string) => {
      if (selectedSocket === 'AM4' || selectedSocket === 'AM5' || selectedSocket === 'SP3' || selectedSocket === 'SP5') {
        chipsetControl?.setValue('B550');
      } else if (selectedSocket === 'LGA1200' || selectedSocket === 'LGA1700' || selectedSocket === 'LGA2066') {
        chipsetControl?.setValue('Z490');
      }
    });
  }
}
