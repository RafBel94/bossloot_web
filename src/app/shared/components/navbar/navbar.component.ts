import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { AuthService } from "../../../services/auth.service";
import { faCopyright, faEnvelope } from "@fortawesome/free-solid-svg-icons";

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
    brandIcon = faCopyright;
    contactFormIcon = faEnvelope;
    userName = localStorage.getItem('bosslootUsername');

    authService = inject(AuthService);
    router = inject(Router);

    logoutUser() {
        this.authService.logoutUser();
        this.router.navigate(['/login']);
    }
}