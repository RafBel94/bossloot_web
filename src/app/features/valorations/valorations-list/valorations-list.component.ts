import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { themeQuartz, type ColDef, type GridApi, type GridReadyEvent } from 'ag-grid-community';
import { LoadingLogoComponent } from '../../../shared/components/loading-logo/loading-logo.component';
import { Router } from '@angular/router';
import { ValorationService } from '../../../services/valoration.service';
import { Valoration } from '../../../models/valorations/valoration';
import { ValorationUser } from '../../../models/valorations/valoration-user';
import { ValorationProduct } from '../../../models/valorations/valoration-product';

@Component({
  selector: 'app-valorations-list',
  imports: [AgGridAngular, LoadingLogoComponent],
  templateUrl: './valorations-list.component.html',
  styleUrl: './valorations-list.component.scss'
})
export class ValorationsListComponent {
  valorationsService = inject(ValorationService);
  router = inject(Router);
  gridApi!: GridApi;
  isLoading = true;
  valorationsList: Valoration[] = [];

  pagination = true;
  paginationPageSize = 25;
  paginationPageSizeSelector = [10, 25, 50, 100];


  ngOnInit() {
  this.valorationsService.getValorations().subscribe(response => {
    this.valorationsList = response.data.map((item: any) => {
      const user = new ValorationUser(
        item.user.id,
        item.user.name,
        item.user.profile_picture,
        item.user.level
      );
      
      const product = new ValorationProduct(
        item.product.id,
        item.product.name,
        item.product.image
      );
      
      return new Valoration(
        item.id,
        item.user_id,
        item.product_id,
        item.rating,
        item.comment,
        item.image,
        item.verified,
        user,
        product,
        new Date(item.created_at),
        new Date(item.updated_at)
      );
    });
    
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
  rowData: Valoration[] = [];
  colDefs: ColDef[] = [
    { field: "user.name", filter: true, maxWidth: 300, headerName: 'Username' },
    { field: "product.name", filter: true, maxWidth: 300, headerName: 'Product' },
    { field: "comment", filter: true, headerName: 'Comment' },
    { field: "rating", filter: true, maxWidth: 150, headerName: 'Rating', cellStyle: { textAlign: 'center' } },
    {
      field: "verified",
      headerName: 'Verified',
      filter: true,
      maxWidth: 150,
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

        const answerButton = document.createElement('button');
        answerButton.textContent = 'Open';
        answerButton.className = 'btn btn-primary btn-sm me-3 w-50 ps-2 pe-2';
        answerButton.addEventListener('click', () => {
          this.openValoration(params.data);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm w-50 ps-2 pe-2';
        deleteButton.addEventListener('click', () => {
          this.deleteValoration(params.data);
        });

        container.appendChild(answerButton);
        container.appendChild(deleteButton);

        return container;
      },
      minWidth: 240,
      maxWidth: 300,
    }
  ];


  // FUNCTIONS

  // Get all contact forms
  onFilterTextBoxChanged() {
    this.gridApi.setGridOption("quickFilterText", (document.getElementById("filter-text-box") as HTMLInputElement).value,
    );
  }

  // Update the grid with the new data
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('rowData', this.valorationsList);
  }

  // Navigate to the answer page
  openValoration(valoration: any) {
    this.router.navigate([`/dashboard/valorations/verify/${valoration.id}`]);
  }

  // Delete a contact form
  deleteValoration(valoration: any) {
    if (!confirm('Are you sure you want to delete this valoration?')) {
      return;
    }

    this.valorationsService.deleteValoration(valoration.id).subscribe({
      next: (res: any) => {
        if (this.gridApi) {
          this.gridApi.applyTransaction({ remove: [valoration] });
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
