import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactForm } from '../../../models/contact-forms/contact-form';
import { BrandService } from '../../../services/brand.service';
import { ContactService } from '../../../services/contact.service';
import { CommonModule } from '@angular/common';
import { LoadingLogoComponent } from "../../../shared/components/loading-logo/loading-logo.component";

@Component({
  selector: 'app-contact-forms-details',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoadingLogoComponent],
  templateUrl: './contact-forms-details.component.html',
  styleUrl: './contact-forms-details.component.scss'
})
export class ContactFormsDetailsComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  contactService = inject(ContactService);
  brandService = inject(BrandService);
  formBuilder = inject(FormBuilder);

  responseForm!: FormGroup;
  contactFormData: ContactForm | null = null;
  id: number;
  errorMessage = '';
  isLoading = true;

  constructor() {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadContactFormData();
    this.initResponseForm();
  }

  // Load the contact form data
  private loadContactFormData(): void {
      this.contactService.getContactFormById(this.id)
        .subscribe({
          next: (res: { data: ContactForm }) => {
            this.contactFormData = res.data;
            this.isLoading = false;
          },
          error: (err) => {
            console.log('Error loading contact form:', err);
            if (err.status === 403) {
              this.router.navigate(['/403']);
            } else if (err.status === 404) {
              this.router.navigate(['/404']);
            } else {
              console.error('Error loading contact form:', err);
            }
            this.isLoading = false;
          }
        });
    }

  initResponseForm() {
    this.responseForm = this.formBuilder.group({
      answer: ['', Validators.required]
    });
  }

  // Send the answer to the contact form
  onSubmit() {
    this.isLoading = true;
    const answer = this.responseForm.get('answer')?.value;
    this.contactService.resolveContactForm(this.id, answer).subscribe({
        next: (res: any) => {
          this.router.navigate(['/dashboard/contact-forms/list']);
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Contact form resolve error:', err);
          if (err.error?.errors) {
            this.errorMessage = Object.values(err.error.errors).flat().join('\n');
          } else {
            this.errorMessage = err.message || 'Error resolving the issue';
          }
        }
      });
  }


  // Return to contact forms list
  onReturn() {
    this.router.navigate(['/dashboard/contact-forms/list']);
  }
}
