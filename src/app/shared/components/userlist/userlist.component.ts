import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { TableUser } from '../../../interfaces/tableUser';
import { UserService } from '../../../services/user.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {
  userService = inject(UserService);
  router = inject(Router);
  gridApi!: GridApi;

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
    { field: "name", filter: true, minWidth:300, maxWidth: 340},
    { field: "email", filter: true, minWidth:320, maxWidth: 360},
    { field: "level", filter: true, minWidth:100, maxWidth: 120},
    { field: "points", filter: true, minWidth: 100, maxWidth: 120},
    { field: "activated", filter: true, minWidth:120, maxWidth: 140},
    { field: "email_confirmed", headerName: 'Email Confirmed', filter: true, minWidth:180, maxWidth: 200},
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        container.className = 'd-flex justify-content-center mt-1';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn btn-primary btn-sm me-3 w-2 ps-2 pe-2';
        editButton.addEventListener('click', () => {
          this.editUser(params.data);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm w-25 ps-2 pe-2';
        deleteButton.addEventListener('click', () => {
          this.deleteUser(params.data);
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
    this.userService.getUsers().subscribe(response => {
      this.rowData = response.data;
      this.gridApi.setGridOption('rowData', this.rowData);
    });
  }

  editUser(user: any) {
    this.router.navigate([`/dashboard/users/profile/${user.id}`]);
  }

  deleteUser(user: any) {
    if (!confirm('Are you sure you want to delete the user?')) {
      return;
    }

    this.userService.deleteUser(user.id).subscribe({
      next: (res: any) => {
        if (this.gridApi) {
          this.gridApi.applyTransaction({ remove: [user] });
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}