import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '../../../../models/brands/Brand';
import { Category } from '../../../../models/categories/Category';
import { BrandService } from '../../../../services/brand.service';
import { ProductService } from '../../../../services/product.service';
import { formUtils } from '../../../../utils/productFormUtils';
import { CaseformTableComponent } from "./caseform/caseform-table/caseform-table.component";
import { CaseformComponent } from "./caseform/caseform.component";
import { CoolerformTableComponent } from "./coolerform/coolerform-table/coolerform-table.component";
import { CoolerformComponent } from "./coolerform/coolerform.component";
import { CpuformTableComponent } from "./cpuform/cpuform-table/cpuform-table.component";
import { CpuformComponent } from './cpuform/cpuform.component';
import { DisplayformTableComponent } from "./displayform/displayform-table/displayform-table.component";
import { DisplayformComponent } from "./displayform/displayform.component";
import { GpuformTableComponent } from './gpuform/gpuform-table/gpuform-table.component';
import { GpuformComponent } from './gpuform/gpuform.component';
import { KeyboardformTableComponent } from "./keyboardform/keyboardform-table/keyboardform-table.component";
import { KeyboardformComponent } from "./keyboardform/keyboardform.component";
import { MotherboardformTableComponent } from "./motherboardform/motherboardform-table/motherboardform-table.component";
import { MotherboardformComponent } from "./motherboardform/motherboardform.component";
import { MouseformTableComponent } from "./mouseform/mouseform-table/mouseform-table.component";
import { MouseformComponent } from "./mouseform/mouseform.component";
import { PsuformTableComponent } from "./psuform/psuform-table/psuform-table.component";
import { PsuformComponent } from "./psuform/psuform.component";
import { RamformTableComponent } from './ramform/ramform-table/ramform-table.component';
import { RamformComponent } from './ramform/ramform.component';
import { StorageformTableComponent } from "./storageform/storageform-table/storageform-table.component";
import { StorageformComponent } from "./storageform/storageform.component";

@Component({
  selector: 'app-productform',
  imports: [FormsModule, ReactiveFormsModule, RamformComponent, RamformTableComponent, CpuformComponent, CpuformTableComponent, GpuformComponent, GpuformTableComponent, MotherboardformComponent, MotherboardformTableComponent, StorageformComponent, StorageformTableComponent, PsuformComponent, PsuformTableComponent, CaseformComponent, CaseformTableComponent, CoolerformComponent, CoolerformTableComponent, DisplayformComponent, DisplayformTableComponent, KeyboardformComponent, KeyboardformTableComponent, MouseformComponent, MouseformTableComponent],
  templateUrl: './productform.component.html',
  styleUrl: './productform.component.scss'
})
export class ProductformComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  brandService = inject(BrandService);

  uploadForm!: FormGroup;
  @Input() productData: any | null;
  @Input() categories: Category[] = [];
  @Input() brands: Brand[] = [];
  submitButtonText: string = '';
  selectedFile: File | null = null;
  errorMessage = '';
  id = null;
  category_id: number | null = null;
  isLoading = false;
  brand: string | null = null;

  constructor() {
    this.id = this.route.snapshot.params['id'] ?? null;
    this.submitButtonText = this.id ? 'Update' : 'Create';
  }

  ngOnInit() {
    this.category_id = this.productData?.category_id ?? 1;
    this.initForm();
    this.getBrandName(this.uploadForm.get('brand')?.value);
    this.setupOfferDiscountLogic();
    this.isLoading = false;
  }

  initForm() {
    this.uploadForm = new FormGroup({
      name: new FormControl(this.productData?.name || '', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl(this.productData?.description || '', [Validators.required, Validators.maxLength(255)]),
      category: new FormControl(this.productData?.category_id || 1, [Validators.required]),
      brand: new FormControl(this.productData?.brand_id || 1, [Validators.required]),
      model: new FormControl(this.productData?.model || '', [Validators.required, Validators.maxLength(60)]),
      price: new FormControl(this.productData?.price || 0, [Validators.required, Validators.min(1), Validators.max(99999)]),
      quantity: new FormControl(this.productData?.quantity || 0, [Validators.required, Validators.min(0)]),
      on_offer: new FormControl(this.productData?.on_offer || false, [Validators.required]),
      discount: new FormControl(this.productData?.discount || 0, [Validators.required, Validators.min(0), Validators.max(100)]),
      featured: new FormControl(this.productData?.featured || false, [Validators.required]),
      image: new FormControl(this.productData?.image || ''),
      points: new FormControl(this.productData?.points || 0, [Validators.required, Validators.min(0), Validators.max(2000)]),
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

  getBrandName(id: number) {
    for (let brand of this.brands) {
      if (brand.id === id) {
        this.brand = brand.name;
        break;
      }
    }
  }
  
  onBrandChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedBrand = Number(selectElement.value);
    this.getBrandName(selectedBrand);
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

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = Number(selectElement.value);
    this.category_id = selectedCategory;
    this.uploadForm.patchValue({ category: selectedCategory });
  }

  onNewBrand() {
    if (!confirm('Are you sure you want to add a new brand?\nThis will redirect you to the brand creation page.')) {
      return;
    }

    this.router.navigate(['/dashboard/brands/new']);
  }

  onSubmit() {

    if (!confirm('Are you sure you want to update the product?')) {
      return;
    }

    this.isLoading = true;

    const formData = formUtils.prepareFormData(this.uploadForm, this.id, this.selectedFile);

    if (this.id) {
      this.productService.updateProduct(this.id, formData).subscribe({
        next: (res: any) => {
          this.router.navigate(['/dashboard/products/list']);
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Update error:', err);
          if (err.error?.errors) {
            this.errorMessage = Object.values(err.error.errors).flat().join('\n');
          } else {
            this.errorMessage = err.message || 'Error updating product';
          }
        }
      });
    } else {
      this.productService.addProduct(formData).subscribe({
        next: (res: any) => {
          this.router.navigate(['/dashboard/products/list']);
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Create error:', err);
          if (err.error?.errors) {
            this.errorMessage = Object.values(err.error.errors).flat().join('\n');
          } else {
            this.errorMessage = err.message || 'Error creating product';
          }
        }
      });
    }
  }

  onReturn() {
    this.router.navigate(['/dashboard/products/list']);
  }
}
