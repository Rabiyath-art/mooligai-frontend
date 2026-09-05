import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

    private readonly authService = inject(AuthService);

    isLoggedIn = false;
    userMenuOpen = false;
    mobileMenuOpen = false;
    cartCount = 0;
    wishlistCount = 0;

    ngOnInit(): void {
        this.authService.isLoggedIn$.subscribe(loggedIn => {
            this.isLoggedIn = loggedIn;
        });
    }


    toggleMobileMenu(): void {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        if (this.mobileMenuOpen) {
            this.userMenuOpen = false;
        }
    }


    closeMobileMenu(): void {
        this.mobileMenuOpen = false;
    }

    toggleUserMenu(): void {
        this.userMenuOpen = !this.userMenuOpen;
    }

    closeUserMenu(): void {
        this.userMenuOpen = false;
    }

    logout(): void {
        this.userMenuOpen = false;
        this.mobileMenuOpen = false;
        this.authService.handleLogout();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.mg-user-dropdown')) {
            this.userMenuOpen = false;
        }
    }
}