import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/products/Product';
import { RamProduct } from '../../../models/products/RamProduct';
import { ProductService } from '../../../services/product.service';
import { LoadingLogoComponent } from "../../../shared/components/loading-logo/loading-logo.component";
import { ProductformComponent } from "./productform/productform.component";
import { GpuProduct } from '../../../models/products/GpuProduct';
import { CpuProduct } from '../../../models/products/CpuProduct';
import { MotherboardProduct } from '../../../models/products/MotherboardProduct';
import { PsuProduct } from '../../../models/products/PsuProduct';
import { CaseProduct } from '../../../models/products/CaseProduct';
import { StorageProduct } from '../../../models/products/StorageProduct';
import { DisplayProduct } from '../../../models/products/DisplayProduct';
import { KeyboardProduct } from '../../../models/products/KeyboardProduct';
import { MouseProduct } from '../../../models/products/MouseProduct';
import { CoolerProduct } from '../../../models/products/CoolerProduct';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { Category } from '../../../models/categories/Category';
import { Brand } from '../../../models/brands/Brand';

@Component({
  selector: 'app-productdetails',
  imports: [LoadingLogoComponent, ProductformComponent],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  brandService = inject(BrandService);

  product: Product | null = null;
  categories: Category[] = [];
  brands: Brand[] = [];
  productId = null;
  isLoading = true;

  constructor() {
    this.productId = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : null;
  }

  ngOnInit() {
    this.loadCategoriesAndBrands();
    this.loadProductData();
  }

  loadCategoriesAndBrands() {
    this.categoryService.getCategories()
      .subscribe({
        next: (res: { data: Category[] }) => {
          this.categories = res.data;
        },
        error: (err) => {
          console.error('Error loading categories:', err);
        }
      }
      );

    this.brandService.getBrands()
      .subscribe({
        next: (res: { data: Brand[] }) => {
          this.brands = res.data;
        },
        error: (err) => {
          console.error('Error loading brands:', err);
        }
      }
      );
  }


  loadProductData() {
    if (this.productId) {
      this.productService.getProductById(this.productId)
        .subscribe({
          next: (res: { data: Product }) => {
            this.product = this.createProductWithSpecs(res.data);
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error loading product:', err);
            this.router.navigate(['/404']);
            this.isLoading = false;
          }
        });
    } else {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }

  createProductWithSpecs(product: any) {
    switch (product.category_id) {
      case 1:
        return new RamProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.speed, product.specs.memory, product.specs.memory_type, product.specs.latency);
      case 2:
        return new GpuProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.memory, product.specs.memory_type, product.specs.core_clock, product.specs.boost_clock, product.specs.consumption, product.specs.length);
      case 3:
        return new CpuProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.socket, product.specs.core_count, product.specs.thread_count, product.specs.base_clock, product.specs.boost_clock, product.specs.consumption, product.specs.integrated_graphics);
      case 4:
        return new MotherboardProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.socket, product.specs.chipset, product.specs.form_factor, product.specs.memory_max, product.specs.memory_slots, product.specs.memory_type, product.specs.memory_speed, product.specs.sata_ports, product.specs.m_2_slots, product.specs.pcie_slots, product.specs.usb_ports, product.specs.lan, product.specs.audio, product.specs.wifi, product.specs.bluetooth);
      case 5:
        return new StorageProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.type, product.specs.capacity, product.specs.rpm, product.specs.read_speed, product.specs.write_speed);
      case 6:
        return new PsuProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.efficiency_rating, product.specs.wattage, product.specs.modular, product.specs.fanless);
      case 7:
        return new CaseProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.caseType, product.specs.formFactorSupport, product.specs.temperedGlass, product.specs.expansionSlots, product.specs.maxGpuLength, product.specs.maxCpuCoolerHeight, product.specs.radiatorSupport, product.specs.extraFansConnectors, product.specs.depth, product.specs.width, product.specs.height, product.specs.weight);
      case 8:
        return new CoolerProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.type, product.specs.fan_rpm, product.specs.consumption, product.specs.socket_support, product.specs.width, product.specs.height);
      case 9:
        return new DisplayProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.resolution, product.specs.refresh_rate, product.specs.response_time, product.specs.panel_type, product.specs.aspect_ratio, product.specs.curved, product.specs.brightness, product.specs.contrast_ratio, product.specs.sync_type, product.specs.hdmi_ports, product.specs.display_ports, product.specs.inches, product.specs.weight);
      case 10:
        return new KeyboardProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.type, product.specs.switch_type, product.specs.width, product.specs.height, product.specs.weight);
      case 11:
        return new MouseProduct(product.name, product.description, product.category_id, product.brand_id, product.model, product.price, product.quantity, product.on_offer, product.discount, product.featured, product.image, product.points, product.specs.dpi, product.specs.sensor, product.specs.buttons, product.specs.bluetooth, product.specs.weight);
      default:
        return null;
    }
  }
}
