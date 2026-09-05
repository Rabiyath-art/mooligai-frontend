import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Category {
    _id: string;
    name: string;
    slug: string;
    isActive?: boolean;
}

export interface CategoryResponse {
    success: boolean;
    data: Category[];
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl =
        `${environment.apiUrl}/categories`;


    getCategories(): Observable<CategoryResponse> {

        return this.http.get<CategoryResponse>(
            this.apiUrl,
            {
                withCredentials: true
            }
        );

    }

}