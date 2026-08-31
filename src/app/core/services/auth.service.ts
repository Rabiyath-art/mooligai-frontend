import {
    Injectable,
    inject
} from '@angular/core';

import {
    HttpClient
} from '@angular/common/http';

import {
    BehaviorSubject,
    Observable
} from 'rxjs';

import {
    environment
} from '../../../environments/environment';

import {
    User
} from '../models/user.model';

import {
    AuthResponse
} from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly http =
        inject(HttpClient);

    private readonly apiUrl =
        `${environment.apiUrl}/auth`;


    private readonly userSubject =
        new BehaviorSubject<User | null>(null);

    readonly user$ =
        this.userSubject.asObservable();


    private readonly loggedInSubject =
        new BehaviorSubject<boolean>(false);

    readonly isLoggedIn$ =
        this.loggedInSubject.asObservable();


    getCurrentUser(): Observable<AuthResponse> {

        return this.http.get<AuthResponse>(
            `${this.apiUrl}/me`,
            {
                withCredentials: true
            }
        );

    }


    loadCurrentUser(): void {

        this.getCurrentUser()
            .subscribe({

                next: (response) => {

                    this.userSubject.next(
                        response.data
                    );

                    this.loggedInSubject.next(
                        true
                    );

                },

                error: () => {

                    this.userSubject.next(null);

                    this.loggedInSubject.next(
                        false
                    );

                }

            });

    }


    loginWithGoogle(): void {

        window.location.href =
            `${this.apiUrl}/google`;

    }


    logout(): Observable<{
        success: boolean;
        message: string;
    }> {

        return this.http.post<{
            success: boolean;
            message: string;
        }>(
            `${this.apiUrl}/logout`,
            {},
            {
                withCredentials: true
            }
        );

    }


    handleLogout(): void {

        this.logout()
            .subscribe({

                next: () => {

                    this.userSubject.next(null);

                    this.loggedInSubject.next(
                        false
                    );

                },

                error: (error) => {

                    console.error(
                        'Logout failed',
                        error
                    );

                }

            });
    }


    get user(): User | null {
        return this.userSubject.value;
    }


    get isLoggedIn(): boolean {
        return this.loggedInSubject.value;
    }

}