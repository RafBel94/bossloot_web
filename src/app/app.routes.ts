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
            { path: '', redirectTo: 'users', pathMatch: 'full' },
        ]
    },
    { path: '404', component: NotfoundComponent },
    { path: '403', component: ForbiddenComponent },
    { path: '**', component: NotfoundComponent }
];
