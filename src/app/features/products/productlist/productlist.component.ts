import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { themeQuartz, type ColDef, type GridApi, type GridReadyEvent } from 'ag-grid-community';
import { TableProduct } from '../../../interfaces/tableProduct';
import { ProductService } from '../../../services/product.service';
import { AgGridAngular } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/products/Product';

@Component({
  selector: 'app-productlist',
  imports: [AgGridAngular, CommonModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent {
  productService = inject(ProductService);
  router = inject(Router);
  gridApi!: GridApi;
  isLoading = true;
  productList: Product[] = [];

  pagination = true;
  paginationPageSize = 25;
  paginationPageSizeSelector = [10, 25, 50, 100];

  constructor() {
    this.productService.getProducts().subscribe(response => {
      this.productList = response.data;
      this.isLoading = false;
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
    { field: "name", filter: true, minWidth: 280, maxWidth: 320 },
    { field: "category", filter: true, minWidth: 160, maxWidth: 160},
    { field: "model", filter: true, minWidth: 280, maxWidth: 320 },
    { field: "brand", filter: true, minWidth: 170, maxWidth: 180 },
    { field: "price", filter: true, minWidth: 100, maxWidth: 120 },
    { field: "quantity", filter: true, minWidth: 100, maxWidth: 120 },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        container.className = 'd-flex justify-content-center mt-1';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn btn-primary btn-sm me-3 w-25 ps-2 pe-2';
        editButton.addEventListener('click', () => {
          this.editProduct(params.data);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm w-25 ps-2 pe-2';
        deleteButton.addEventListener('click', () => {
          this.deleteProduct(params.data);
        });

        container.appendChild(editButton);
        container.appendChild(deleteButton);

        return container;
      },
      minWidth: 240
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

  editProduct(product: any) {
    this.router.navigate([`/dashboard/products/profile/${product.id}`]);
  }

  deleteProduct(product: any) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.deleteProduct(product.id).subscribe({
      next: (res: any) => {
        if (this.gridApi) {
          this.gridApi.applyTransaction({ remove: [product] });
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
