import { Component, inject, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { UserService } from '../../../services/user.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent implements OnInit {
  userService = inject(UserService);
  
  rowData: any[] = [];

  colDefs: ColDef[] = [
    { field: "name" },
    { field: "email" },
    { field: "level" },
    { field: "points" },
    { field: "activated" },
    { field: "email_confirmed" },
  ];
  
  ngOnInit() {
    this.userService.getUsers().subscribe(response => {
      this.rowData = response.data.map((user: any) => ({
        name: user.name,
        email: user.email,
        level: user.level,
        points: user.points,
        activated: user.activated,
        email_confirmed: user.email_confirmed,
      }));
    });
  }
}