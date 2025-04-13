import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridReadyEvent, themeQuartz, type GridApi } from 'ag-grid-community';
import { Brand } from '../../../models/brands/Brand';
import { BrandService } from '../../../services/brand.service';
import { LoadingLogoComponent } from '../../../shared/components/loading-logo/loading-logo.component';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-brandlist',
  imports: [AgGridAngular, LoadingLogoComponent],
  templateUrl: './brandlist.component.html',
  styleUrl: './brandlist.component.scss'
})
export class BrandlistComponent {

  // INJECT SERVICES
  brandService = inject(BrandService);
  router = inject(Router);

  // COMPONENT PROPERTIES
  isLoading = true;
  brandList: Brand[] = [];

  // AG GRID PROPERTIES
  gridApi!: GridApi;
  pagination = true;
  paginationPageSize = 25;
  paginationPageSizeSelector = [10, 25, 50, 100];

  ngOnInit() {
    this.brandService.getBrands().subscribe(response => {
      this.brandList = response.data;
      this.isLoading = false;
    });
  }

  // AG GRID THEME CONFIGURATION
  theme = themeQuartz.withParams({
    backgroundColor: "#404040",
    foregroundColor: "rgb(255, 255, 255)",
    headerTextColor: "rgb(255, 255, 255)",
    headerBackgroundColor: "rgb(30, 30, 30)",
    oddRowBackgroundColor: "rgb(0, 0, 0, 0.15)",
    headerColumnResizeHandleColor: "rgb(154, 154, 154)",
  });

  // AG GRID DATA AND HEADER CONFIGURATION
  rowData: Brand[] = [];
  colDefs: ColDef[] = [
    {field: "name", filter: true, minWidth: 120, maxWidth: 200},
    {field: "description", filter: true,},
    {
      field: "created_at",
      headerName: "Created At",
      filter: true,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
      cellStyle: { textAlign: 'center' },
      minWidth: 120,
      maxWidth: 150
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
          this.editBrand(params.data.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm w-50 ps-2 pe-2';
        deleteButton.addEventListener('click', () => {
          this.deleteBrand(params.data);
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
    this.gridApi.setGridOption('rowData', this.brandList.slice(1));
  }

  onCreateBrand() {
    this.router.navigate(['/dashboard/brands/new']);
  }

  editBrand(id: number) {
    if (id === 1) {
      alert('You cannot edit the default brand.');
      return;
    }

    this.router.navigate(['/dashboard/brands/edit', id]);
  }

  deleteBrand(brand: Brand) {
    if (brand.id === 1) {
      alert('You cannot delete the default brand.');
      return;
    }

    if (confirm('Are you sure you want to delete this brand?\n All products associated with this brand will be moved to "No Brand" brand.')) {
      this.brandService.deleteBrand(brand.id).subscribe({
        next: (res: any) => {
          if (this.gridApi) {
            this.gridApi.applyTransaction({ remove: [brand] });
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}
