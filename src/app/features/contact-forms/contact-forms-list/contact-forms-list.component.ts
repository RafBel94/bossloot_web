import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { themeQuartz, type ColDef, type GridApi, type GridReadyEvent } from 'ag-grid-community';
import { LoadingLogoComponent } from '../../../shared/components/loading-logo/loading-logo.component';
import { ContactService } from '../../../services/contact.service';
import { Router } from '@angular/router';
import { ContactForm } from '../../../models/contact-forms/contact-form';

@Component({
  selector: 'app-contact-forms-list',
  imports: [AgGridAngular, LoadingLogoComponent],
  templateUrl: './contact-forms-list.component.html',
  styleUrl: './contact-forms-list.component.scss'
})
export class ContactFormsListComponent {
  contactService = inject(ContactService);
  router = inject(Router);
  gridApi!: GridApi;
  isLoading = true;
  contactFormsList: any[] = [];

  pagination = true;
  paginationPageSize = 25;
  paginationPageSizeSelector = [10, 25, 50, 100];


  ngOnInit() {
    this.contactService.getContactForms().subscribe(response => {
      this.contactFormsList = response.data;
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
  rowData: ContactForm[] = [];
  colDefs: ColDef[] = [
    { field: "name", filter: true, maxWidth: 300, headerName: 'Name' },
    { field: "email", filter: true, maxWidth: 400, headerName: 'Email' },
    { field: "subject", filter: true, headerName: 'Subject' },
    {
      field: "status",
      headerName: 'Answered',
      filter: true,
      maxWidth: 150,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        const icon = document.createElement('i');
        icon.className = params.value === 'answered' ? 'fa-solid fa-check' : 'fa-solid fa-times';
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
        answerButton.textContent = 'Answer';
        answerButton.className = 'btn btn-primary btn-sm me-3 w-50 ps-2 pe-2';
        answerButton.addEventListener('click', () => {
          this.answerContactForm(params.data);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm w-50 ps-2 pe-2';
        deleteButton.addEventListener('click', () => {
          this.deleteContactform(params.data);
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
    this.gridApi.setGridOption('rowData', this.contactFormsList);
  }

  // Navigate to the answer page
  answerContactForm(contactForm: any) {
    this.router.navigate([`/dashboard/contact-forms/answer/${contactForm.id}`]);
  }

  // Delete a contact form
  deleteContactform(contactForm: any) {
    if (!confirm('Are you sure you want to delete this contact form?')) {
      return;
    }

    this.contactService.deleteContactForm(contactForm.id).subscribe({
      next: (res: any) => {
        if (this.gridApi) {
          this.gridApi.applyTransaction({ remove: [contactForm] });
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
