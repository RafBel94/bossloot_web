import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
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

  rowData: TableUser[] = [];

  colDefs: ColDef[] = [
    { field: "name", filter: true },
    { field: "email", filter: true },
    { field: "level", filter: true },
    { field: "points", filter: true },
    { field: "activated", filter: true },
    { field: "email_confirmed", headerName: 'Email Confirmed', filter: true },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const container = document.createElement('div');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn btn-primary btn-sm me-2';
        editButton.addEventListener('click', () => {
          this.editUser(params.data);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.addEventListener('click', () => {
          this.deleteUser(params.data);
        });

        container.appendChild(editButton);
        container.appendChild(deleteButton);

        return container;
      }
    }
  ];

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