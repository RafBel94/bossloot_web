import { Component, Input } from '@angular/core';
import { RamProduct } from '../../../../models/products/RamProduct';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ramform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './ramform.component.html',
  styleUrl: './ramform.component.scss'
})
export class RamformComponent {
  @Input() product!: RamProduct;
  uploadForm: any;




  onUpdate() {
    throw new Error('Method not implemented.');
  }
}
