import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBagShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from "../../../services/auth.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    userIcon = faCircleUser;
    productIcon = faBagShopping;

    authService = inject(AuthService);
    router = inject(Router);

    logoutUser() {
        this.authService.logoutUser();
        this.router.navigate(['/login']);
    }
}