import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './guards/auth-guard.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';
import { UsersComponent } from './features/users/users.component';
import { ProductsComponent } from './features/products/products.component';
import { ProfileComponent } from './features/users/profile/profile.component';
import { UserlistComponent } from './features/users/userlist/userlist.component';
import { ConfirmEmailComponent } from './features/confirmemail/confirmemail.component';
import { ProductlistComponent } from './features/products/productlist/productlist.component';
import { ProductdetailsComponent } from './features/products/productdetails/productdetails.component';

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
                    { path: 'details/:id', component: ProductdetailsComponent },
                    { path: 'new', component: ProductdetailsComponent },
                ]
            },
            { path: '', redirectTo: 'users', pathMatch: 'full' }
        ]
    },
];
