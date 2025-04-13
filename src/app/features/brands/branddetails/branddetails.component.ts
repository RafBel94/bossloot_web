import { Component, inject } from '@angular/core';
import { LoadingLogoComponent } from "../../../shared/components/loading-logo/loading-logo.component";
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../models/brands/Brand';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandformComponent } from "./brandform/brandform.component";

@Component({
  selector: 'app-branddetails',
  imports: [LoadingLogoComponent, BrandformComponent],
  templateUrl: './branddetails.component.html',
  styleUrl: './branddetails.component.scss'
})
export class BranddetailsComponent {
  // INJECTED SERVICES
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  brandService = inject(BrandService);

  // COMPONENT PROPERTIES
  brand: any | null = null;
  brandId = null;
  isLoading = true;

  constructor() {
    this.brandId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadBrandData();
  }

  loadBrandData() {
    if (this.brandId) {
      this.brandService.getBrandById(this.brandId)
        .subscribe({
          next: (res: { data: Brand }) => {
            if (res.data.id == 1) {
              this.router.navigate(['/403']);
            }
            this.brand = this.createNewBrand(res.data);
            this.isLoading = false;
          },
          error: (err) => {
            if(err.status == 403) {
              this.router.navigate(['/403']);
            } else if(err.status == 404) {
              this.router.navigate(['/404']);
            }
            else {
              console.log("Error loading brand data: ", err);
            }
            this.isLoading = false;
          }
        });
    } else {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }

  createNewBrand(brand: Brand): Brand {
    return new Brand(
      brand.id,
      brand.name,
      brand.description,
      brand.image
    );
  }
}
