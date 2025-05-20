import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingLogoComponent } from "../../../shared/components/loading-logo/loading-logo.component";
import { ValorationService } from '../../../services/valoration.service';
import { Valoration } from '../../../models/valorations/valoration';
import { ValorationUser } from '../../../models/valorations/valoration-user';
import { ValorationProduct } from '../../../models/valorations/valoration-product';

@Component({
  selector: 'app-valoration-details',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoadingLogoComponent],
  templateUrl: './valoration-details.component.html',
  styleUrl: './valoration-details.component.scss'
})
export class ValorationDetailsComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  valorationService = inject(ValorationService);
  formBuilder = inject(FormBuilder);

  valorationData: Valoration | null = null;
  id: number;
  errorMessage = '';
  isLoading = true;

  constructor() {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadValorationData();
  }

  // Load the contact form data
  private loadValorationData(): void {
  this.valorationService.getValorationById(this.id)
    .subscribe({
      next: (res: { data: any }) => {
        const data = res.data;
        
        if (!data.user || !data.product) {
          console.error('The valoration does not contain the relations data', data);
          this.errorMessage = 'Error: Valoration data is missing user or product information.';
          this.isLoading = false;
          return;
        }
        
        // Extrae los datos del usuario
        const user = new ValorationUser(
          data.user.id,
          data.user.name,
          data.user.profile_picture,
          data.user.level
        );
        
        // Extrae los datos del producto
        const product = new ValorationProduct(
          data.product.id,
          data.product.name,
          data.product.image
        );
        
        // Crea la valoración completa
        this.valorationData = new Valoration(
          data.id,
          data.user.id,
          data.product.id,
          data.rating,
          data.comment,
          data.image || null,
          data.verified || false,
          user,
          product,
          new Date(data.created_at || Date.now()),
          new Date(data.updated_at || Date.now())
        );
        
        console.log('Valoration loaded correctly:', this.valorationData);
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error loading valoration:', err);
        if (err.status === 403) {
          this.router.navigate(['/403']);
        } else if (err.status === 404) {
          this.router.navigate(['/404']);
        } else {
          console.error('Error loading valoration:', err);
        }
        this.isLoading = false;
      }
    });
  }

  // Send the answer to the contact form
  onSubmit() {
    this.isLoading = true;
    this.valorationService.verifyValoration(this.id).subscribe({
        next: (res: any) => {
          this.router.navigate(['/dashboard/valorations/list']);
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Rating verify error:', err);
          if (err.error?.errors) {
            this.errorMessage = Object.values(err.error.errors).flat().join('\n');
          } else {
            this.errorMessage = err.message || 'Error verifying rating';
          }
        }
      });
  }


  // Return to contact forms list
  onReturn() {
    this.router.navigate(['/dashboard/valorations/list']);
  }
}
