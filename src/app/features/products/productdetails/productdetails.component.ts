import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/products/Product';
import { ProductService } from '../../../services/product.service';
import { RamformComponent } from "./ramform/ramform.component";
import { RamProduct } from '../../../models/products/RamProduct';

@Component({
  selector: 'app-productdetails',
  imports: [CommonModule, RamformComponent],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  injector = inject(Injector);

  baseProduct: any | null = null;
  finalProduct: any;
  productId = this.route.snapshot.params['id'];
  isLoading = true;
  component: any = null;

  ngOnInit() {
    this.loadProductData();
  }


  loadProductData() {
    this.productService.getProductById(this.productId)
      .subscribe({
        next: (res: { data: Product }) => {
          this.finalProduct = this.createProductWithSpecs(res.data);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading product:', err);
          this.isLoading = false;
        }
      });
  }

  createProductWithSpecs(product: any) {
    switch (product.category) {
      case 'ram':
        return new RamProduct(product.name, product.description, product.category, product.model, product.brand, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.specs.speed, product.specs.memory, product.specs.memory_type, product.specs.latency);
      default:
        return null;
    }
  }
}
