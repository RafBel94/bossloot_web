import { Component, inject, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { UserService } from '../../../services/user.service';
import { TableUser } from '../../../interfaces/tableUser';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent{
  userService = inject(UserService);

  isCollapsed = false;
  rowData: TableUser[] = [];

  colDefs: ColDef[] = [
    { field: "name" , filter: true},
    { field: "email" , filter: true},
    { field: "level" , filter: true},
    { field: "points" , filter: true},
    { field: "activated" , filter: true},
    { field: "email_confirmed" , headerName: 'Email Confirmed', filter: true},
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const button = document.createElement('fa-icon');
        button.textContent = 'Edit';
        button.className = 'btn btn-primary btn-sm';
        button.addEventListener('click', () => {
          this.editUser(params.data);
        });
        return button;
      }
    }
  ];

  onGridReady(params: GridReadyEvent) {
    this.userService.getUsers().subscribe(response => {
      this.rowData = response.data;
    });
  }

  editUser(user: any) {
    console.log('Editing user:', user);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}