import { Component, inject, Inject, Input } from '@angular/core';
import { RamProduct } from '../../../../models/products/RamProduct';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-ramform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './ramform.component.html',
  styleUrl: './ramform.component.scss'
})
export class RamformComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  @Input() productData!: RamProduct;
  uploadForm!: FormGroup;
  submitButtonText: string = '';

  constructor() {
    this.submitButtonText = this.route.snapshot.params['id'] ? 'Update' : 'Create';
  }

  ngOnInit() {
    this.initForm();
    this.setupOfferDiscountLogic();
  }

  initForm() {
    this.uploadForm = new FormGroup({
      name: new FormControl(this.productData?.name || ''),
      description: new FormControl(this.productData?.description || ''),
      category: new FormControl(this.productData?.category || 'ram'),
      model: new FormControl(this.productData?.model || ''),
      brand: new FormControl(this.productData?.brand || ''),
      price: new FormControl(this.productData?.price || 0),
      quantity: new FormControl(this.productData?.quantity || 0),
      on_offer: new FormControl(this.productData?.on_offer || false),
      discount: new FormControl(this.productData?.discount || 0),
      featured: new FormControl(this.productData?.featured || false),
      image: new FormControl(this.productData?.image || ''),
      speed: new FormControl(this.productData?.speed || 0),
      memory: new FormControl(this.productData?.memory || 0),
      memory_type: new FormControl(this.productData?.memory_type || ''),
      latency: new FormControl(this.productData?.latency || 0),
    });
  }

  private setupOfferDiscountLogic() {
    this.uploadForm.get('on_offer')?.valueChanges.subscribe((isOnOffer) => {
      const discountControl = this.uploadForm.get('discount');

      if (isOnOffer) {
        discountControl?.enable();
      } else {
        discountControl?.setValue(0);
        discountControl?.disable();
      }
    });

    const initialOfferValue = this.uploadForm.get('on_offer')?.value;
    if (!initialOfferValue) {
      this.uploadForm.get('discount')?.disable();
    }
  }

  onUpdate() {
    throw new Error('Method not implemented.');
  }
}
