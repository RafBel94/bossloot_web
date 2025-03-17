import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './guards/auth-guard.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';
import { UsersComponent } from './features/users/users.component';
import { ProductsComponent } from './features/products/products.component';

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
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            { path: 'users', component: UsersComponent },
            { path: 'products', component: ProductsComponent },
            { path: '', redirectTo: 'users', pathMatch: 'full' }
        ]
    }
];
