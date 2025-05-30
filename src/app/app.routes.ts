import { Routes } from '@angular/router';
import { BranddetailsComponent } from './features/brands/branddetails/branddetails.component';
import { BrandlistComponent } from './features/brands/brandlist/brandlist.component';
import { BrandsComponent } from './features/brands/brands.component';
import { ConfirmEmailComponent } from './features/confirmemail/confirmemail.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ForbiddenComponent } from './features/forbidden/forbidden.component';
import { LoginComponent } from './features/login/login.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { ProductdetailsComponent } from './features/products/productdetails/productdetails.component';
import { ProductlistComponent } from './features/products/productlist/productlist.component';
import { ProductsComponent } from './features/products/products.component';
import { ProfileComponent } from './features/users/profile/profile.component';
import { UserlistComponent } from './features/users/userlist/userlist.component';
import { UsersComponent } from './features/users/users.component';
import { authGuard } from './guards/auth-guard.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';
import { ContactFormsComponent } from './features/contact-forms/contact-forms.component';
import { ContactFormsListComponent } from './features/contact-forms/contact-forms-list/contact-forms-list.component';
import { ContactFormsDetailsComponent } from './features/contact-forms/contact-forms-details/contact-forms-details.component';
import { ValorationsComponent } from './features/valorations/valorations.component';
import { ValorationsListComponent } from './features/valorations/valorations-list/valorations-list.component';
import { ValorationDetailsComponent } from './features/valorations/valoration-details/valoration-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginRedirectGuard]
    },
    {
        path: 'confirm_email/:message',
        component: ConfirmEmailComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'users',
                component: UsersComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: UserlistComponent },
                    { path: 'profile/:id', component: ProfileComponent }
                ]
            },
            {
                path: 'products',
                component: ProductsComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ProductlistComponent },
                    { path: 'edit/:id', component: ProductdetailsComponent },
                    { path: 'new', component: ProductdetailsComponent },
                ]
            },
            {
                path: 'brands',
                component: BrandsComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: BrandlistComponent },
                    { path: 'edit/:id', component: BranddetailsComponent,},
                    { path: 'new', component: BranddetailsComponent },
                ]
            },
            {
                path: 'contact-forms',
                component: ContactFormsComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ContactFormsListComponent },
                    { path: 'answer/:id', component: ContactFormsDetailsComponent },
                ]
            },
            {
                path: 'valorations',
                component: ValorationsComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ValorationsListComponent },
                    { path: 'verify/:id', component: ValorationDetailsComponent },
                ]
            },
            { path: '', redirectTo: 'users', pathMatch: 'full' },
        ]
    },
    { path: '404', component: NotfoundComponent },
    { path: '403', component: ForbiddenComponent },
    { path: '**', component: NotfoundComponent }
];
