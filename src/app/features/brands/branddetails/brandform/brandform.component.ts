import { Component, inject, Input } from '@angular/core';
import { Brand } from '../../../../models/brands/Brand';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../../services/brand.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { formUtils } from '../../../../utils/productFormUtils';

@Component({
  selector: 'app-brandform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './brandform.component.html',
  styleUrl: './brandform.component.scss'
})
export class BrandformComponent {
  // INJECTED SERVICES
  router = inject(Router);
  route = inject(ActivatedRoute);
  brandService = inject(BrandService);

  // COMPONENT PROPERTIES
  @Input() brandData: any | null;
  uploadForm!: FormGroup;
  submitButtonText: string = '';
  errorMessage = '';
  selectedFile: File | null = null;
  id = null;
  isLoading = false;

  constructor() {
    this.id = this.route.snapshot.params['id'] ?? null;
    this.submitButtonText = this.id ? 'Update' : 'Create';
  }

  ngOnInit() {
    this.initForm();
    this.isLoading = false;
  }

  initForm() {
    this.uploadForm = new FormGroup({
      name: new FormControl(this.brandData?.name || '', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl(this.brandData?.description || '', [Validators.required, Validators.maxLength(255)]),
      image: new FormControl(this.brandData?.image || '', [Validators.required]),
    });
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

  onSubmit() {

    if (!confirm('Are you sure you want to update this brand?')) {
      return;
    }

    this.isLoading = true;

    const formData = formUtils.prepareBrandFormData(this.uploadForm, this.id, this.selectedFile);

    if (this.id) {
      this.brandService.updateBrand(this.id, formData).subscribe({
        next: (res: any) => {
          this.router.navigate(['/dashboard/brands/list']);
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Update error:', err);
          if (err.error?.errors) {
            this.errorMessage = Object.values(err.error.errors).flat().join('\n');
          } else {
            this.errorMessage = err.message || 'Error updating brand';
          }
        }
      });
    } else {
      this.brandService.addBrand(formData).subscribe({
        next: (res: any) => {
          this.router.navigate(['/dashboard/brands/list']);
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Create error:', err);
          if (err.error?.errors) {
            this.errorMessage = Object.values(err.error.errors).flat().join('\n');
          } else {
            this.errorMessage = err.message || 'Error creating brand';
          }
        }
      });
    }
  }

  onReturn() {
    if (!confirm('Are you sure you want to cancel and return to the list?')) {
      return;
    }

    this.router.navigate(['/dashboard/brands/list']);
  }
}
