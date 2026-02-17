import { User } from './user.model';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    tc_no: string;
    phone: string;
    birth_date: string;
    gender: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: User;
}
