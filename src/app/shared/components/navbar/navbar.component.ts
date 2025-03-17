import { Component, inject } from "@angular/core";
import { LoginService } from "../../../services/login.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    title = 'Admin Dashboard';

    loginService = inject(LoginService);
    router = inject(Router);

    logoutUser() {
        this.loginService.logoutUser();
        this.router.navigate(['/login']);
    }
}