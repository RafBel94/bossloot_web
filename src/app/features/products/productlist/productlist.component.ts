import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { themeQuartz, type ColDef, type GridApi, type GridReadyEvent } from 'ag-grid-community';
import { TableProduct } from '../../../interfaces/tableProduct';
import { SimpleProduct } from '../../../models/products/SimpleProduct';
import { ProductService } from '../../../services/product.service';
import { LoadingLogoComponent } from "../../../shared/components/loading-logo/loading-logo.component";

@Component({
  selector: 'app-productlist',
  imports: [AgGridAngular, LoadingLogoComponent],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent {
  productService = inject(ProductService);
  router = inject(Router);
  gridApi!: GridApi;
  isLoading = true;
  cdr = inject(ChangeDetectorRef);
  productList: SimpleProduct[] = [];

  pagination = true;
  paginationPageSize = 25;
  paginationPageSizeSelector = [10, 25, 50, 100];

  constructor() {
    this.productService.getProducts().subscribe(response => {
      this.productList = response.data;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  // THEME CONFIGURATION
  theme = themeQuartz.withParams({
    backgroundColor: "#404040",
    foregroundColor: "rgb(255, 255, 255)",
    headerTextColor: "rgb(255, 255, 255)",
    headerBackgroundColor: "rgb(30, 30, 30)",
    oddRowBackgroundColor: "rgb(0, 0, 0, 0.15)",
    headerColumnResizeHandleColor: "rgb(154, 154, 154)",
  });

  // DATA AND HEADER CONFIGURATION
  rowData: TableProduct[] = [];
  colDefs: ColDef[] = [
    { field: "name", filter: true,},
    { field: "category", filter: true, maxWidth: 120},
    { field: "model", filter: true,},
    { field: "brand", filter: true, maxWidth: 120},
    { field: "price", filter: true, maxWidth: 100},
    { 
      field: "on_offer", 
      headerName: 'Offer', 
      filter: true,
      maxWidth: 100,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = params.value === 1 ? 'fa-solid fa-check' : 'fa-solid fa-times';
        container.className = 'd-flex h-100 w-100 justify-content-center align-items-center';
        container.appendChild(icon);
        return container;
      }
    },
    { 
      field: "deleted", 
      headerName: 'Deleted', 
      filter: true,
      maxWidth: 100,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = params.value === 1 ? 'fa-solid fa-check' : 'fa-solid fa-times';
        container.className = 'd-flex h-100 w-100 justify-content-center align-items-center';
        container.appendChild(icon);
        return container;
      }
    },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        container.className = 'd-flex justify-content-center mt-1';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn btn-primary btn-sm me-3 w-50 ps-2 pe-2';
        editButton.addEventListener('click', () => {
          this.editProduct(params.data);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm w-50 ps-2 pe-2';
        deleteButton.addEventListener('click', () => {
          this.deleteProduct(params.data);
        });

        container.appendChild(editButton);
        container.appendChild(deleteButton);

        return container;
      },
      minWidth: 240,
      maxWidth: 300,
    }
  ];

  // FUNCTIONS

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption("quickFilterText", (document.getElementById("filter-text-box") as HTMLInputElement).value,
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('rowData', this.productList);
  }

  onCreateProduct() {
    this.router.navigate(['/dashboard/products/new']);
  }

  editProduct(product: any) {
    this.router.navigate([`/dashboard/products/edit/${product.id}`]);
  }

  deleteProduct(product: any) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.deleteProduct(product.id).subscribe({
      next: (res: any) => {
        if (this.gridApi) {
          const rowIndex = this.productList.findIndex(p => p.id === product.id);
          if (rowIndex !== -1) {
            this.productList[rowIndex].deleted = true;
            this.gridApi.setGridOption('rowData', this.productList);
            this.cdr.detectChanges();
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
