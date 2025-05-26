import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { TableUser } from '../../../interfaces/tableUser';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { LoadingLogoComponent } from "../../../shared/components/loading-logo/loading-logo.component";

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [AgGridAngular, CommonModule, LoadingLogoComponent],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {
  userService = inject(UserService);
  router = inject(Router);
  gridApi!: GridApi;
  isLoading = true;
  cdr = inject(ChangeDetectorRef);
  userList: TableUser[] = [];

  constructor() {
    this.userService.getUsers().subscribe(response => {
      this.userList = response.data;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  pagination = true;
  paginationPageSize = 25;
  paginationPageSizeSelector = [10, 25, 50, 100];

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
  rowData: TableUser[] = [];
  colDefs: ColDef[] = [
    { field: "name", filter: true, minWidth: 230},
    { field: "email", filter: true, minWidth: 250, maxWidth: 360},
    { field: "level", filter: true, minWidth:80, cellStyle: { textAlign: 'center'} },
    { field: "points", filter: true, minWidth: 80, cellStyle: { textAlign: 'center'} },
    { field: "activated", filter: true, minWidth:120,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = params.value === 1 ? 'fa-solid fa-check text-success fa-lg' : 'fa-solid fa-times text-danger fa-lg';
        container.className = 'd-flex h-100 w-100 justify-content-center align-items-center';
        container.appendChild(icon);
        return container;
      }
    },
    { field: "email_confirmed", headerName: 'Confirmed', filter: true, minWidth:120,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = params.value === 1 ? 'fa-solid fa-check text-success fa-lg' : 'fa-solid fa-times text-danger fa-lg';
        container.className = 'd-flex h-100 w-100 justify-content-center align-items-center';
        container.appendChild(icon);
        return container;
      }
    },
    { 
      field: "deleted", 
      headerName: 'Deleted', 
      filter: true,
      maxWidth: 120,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = params.value === 1 ? 'fa-solid fa-check text-success fa-lg' : 'fa-solid fa-times text-danger fa-lg';
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
          this.editUser(params.data);
        });

        const actionButton = document.createElement('button');
    
        if (params.data.deleted === 1) {
          actionButton.textContent = 'Restore';
          actionButton.className = 'btn btn-success btn-sm w-50 ps-2 pe-2';
          actionButton.addEventListener('click', () => {
            this.restoreUser(params.data);
          });
        } else {
          actionButton.textContent = 'Delete';
          actionButton.className = 'btn btn-danger btn-sm w-50 ps-2 pe-2';
          actionButton.addEventListener('click', () => {
            this.deleteUser(params.data);
          });
        }

        container.appendChild(editButton);
        container.appendChild(actionButton);

        return container;
      },
      minWidth: 240,
    }
  ];

  // FUNCTIONS

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption("quickFilterText", (document.getElementById("filter-text-box") as HTMLInputElement).value,
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('rowData', this.userList);
  }

  editUser(user: any) {
    this.router.navigate([`/dashboard/users/profile/${user.id}`]);
  }

  deleteUser(user: any) {
    if (user.role == 'admin') {
      this.router.navigate(['/403']);
      return;
    }
    
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.userService.deleteUser(user.id).subscribe({
      next: (res: any) => {
        if (this.gridApi) {
          const rowIndex = this.userList.findIndex(p => p.id === user.id);
          if (rowIndex !== -1) {
            this.userList[rowIndex].deleted = 1;
            
            // Forzar refresh completo
            this.gridApi.setGridOption('rowData', [...this.userList]);
            this.gridApi.refreshCells();
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  restoreUser(user: any) {
    if (!confirm('Are you sure you want to restore this user?')) {
      return;
    }

    this.userService.restoreUser(user.id).subscribe({
      next: (res: any) => {
        if (this.gridApi) {
          const rowIndex = this.userList.findIndex(p => p.id === user.id);
          if (rowIndex !== -1) {
            this.userList[rowIndex].deleted = 0;
            
            // Forzar refresh completo
            this.gridApi.setGridOption('rowData', [...this.userList]);
            this.gridApi.refreshCells();
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}