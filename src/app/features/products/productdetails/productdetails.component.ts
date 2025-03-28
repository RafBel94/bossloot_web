import { Component, inject } from '@angular/core';
import { RamformComponent } from "./ramform/ramform.component";
import { Product } from '../../../models/products/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  imports: [RamformComponent, CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);

  baseProduct: Product | null = null;
  finalProduct: any;
  productId = this.route.snapshot.params['id'];
  isLoading = false;

  constructor() {
    this.loadProductData();
  }


  loadProductData() {
    this.productService.getProductById(this.productId)
      .subscribe({
        next: (res: { data: Product }) => {
          this.baseProduct = res.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading product:', err);
          this.isLoading = false;
        }
      });
  }
}
