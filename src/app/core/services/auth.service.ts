import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly API_URL = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient) { }

    /**
     * Sends a login request to the backend.
     * Token storage will be implemented later.
     */
    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, request);
    }

    /**
     * Sends a registration request to the backend.
     * Token storage will be implemented later.
     */
    register(request: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/register`, request);
    }
}
