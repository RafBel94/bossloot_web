import { Component, inject, Inject, Input } from '@angular/core';
import { RamProduct } from '../../../../models/products/RamProduct';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selectedFile: File | null = null;
  id = this.route.snapshot.params['id'];
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.submitButtonText = this.route.snapshot.params['id'] ? 'Update' : 'Create';
  }

  ngOnInit() {
    this.initForm();
    this.setupOfferDiscountLogic();
  }

  initForm() {
    this.uploadForm = new FormGroup({
      name: new FormControl(this.productData?.name || '', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl(this.productData?.description || '', [Validators.required, Validators.maxLength(255)]),
      category: new FormControl(this.productData?.category || 'ram', [Validators.required, Validators.maxLength(60)]),
      model: new FormControl(this.productData?.model || '', [Validators.required, Validators.maxLength(60)]),
      brand: new FormControl(this.productData?.brand || '', [Validators.required, Validators.maxLength(60)]),
      price: new FormControl(this.productData?.price || 0, [Validators.required, Validators.min(1), Validators.max(99999)]),
      quantity: new FormControl(this.productData?.quantity || 0, [Validators.required, Validators.min(0)]),
      on_offer: new FormControl(this.productData?.on_offer || false, [Validators.required]),
      discount: new FormControl(this.productData?.discount || 0, [Validators.required, Validators.min(0), Validators.max(100)]),
      featured: new FormControl(this.productData?.featured || false, [Validators.required]),
      image: new FormControl(this.productData?.image || ''),
      speed: new FormControl(this.productData?.speed || 0, [Validators.required, Validators.min(800), Validators.max(6000)]),
      memory: new FormControl(this.productData?.memory || 0, [Validators.required, Validators.max(256)]),
      memory_type: new FormControl(this.productData?.memory_type || '', [Validators.required]),
      latency: new FormControl(this.productData?.latency || 0, [Validators.required]),
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
    if (this.uploadForm.untouched) {
      alert('No changes made to the form. Navigating back to the list.');
      this.router.navigate(['/dashboard/products/list']);
      return;
    }
    
    if (!confirm('Are you sure you want to update the product?')) {
      return;
    }

    this.isLoading = true;

    const formData = this.prepareFormData();

    this.productService.updateProduct(this.id, formData).subscribe({
      next: (res: any) => {
        this.router.navigate(['/dashboard/products/list']);
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Full error:', err);
        if (err.error?.errors) {
          this.errorMessage = Object.values(err.error.errors).flat().join('\n');
        } else {
          this.errorMessage = err.message || 'Error updating user';
        }
      }
    });
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    const formValues = this.uploadForm.getRawValue();

    formData.append('_method', 'PUT');
    formData.append('name', formValues.name ?? '');
    formData.append('description', formValues.description ?? '');
    formData.append('category', formValues.category ?? '');
    formData.append('model', formValues.model ?? '');
    formData.append('brand', formValues.brand ?? '');
    formData.append('price', String(formValues.price ?? 0));
    formData.append('quantity', String(formValues.quantity ?? 0));
    formData.append('on_offer', formValues.on_offer ? '1' : '0');
    formData.append('discount', String(formValues.discount ?? 0));
    formData.append('featured', formValues.featured ? '1' : '0');
    formData.append('speed', String(formValues.speed ?? 0));
    formData.append('memory', String(formValues.memory ?? 0));
    formData.append('memory_type', formValues.memory_type ?? '');
    formData.append('latency', String(formValues.latency ?? 0));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    return formData;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadForm.patchValue({
          image: e.target.result
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onReset() {
    this.uploadForm.reset();
    this.initForm();
  }

  onReturn() {
    this.router.navigate(['/dashboard/products/list']);
  }
}
