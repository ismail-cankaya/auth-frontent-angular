import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/auth.models';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {

    registerForm: FormGroup;
    isLoading = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;
    showPassword = false;

    genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ];

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.registerForm = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(2)]],
            last_name: ['', [Validators.required, Validators.minLength(2)]],
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            tc_no: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
            phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
            birth_date: ['', [Validators.required]],
            gender: ['', [Validators.required]]
        });
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;
        this.successMessage = null;

        const request: RegisterRequest = this.registerForm.value;

        this.authService.register(request).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.successMessage = response.message || 'Registration successful! You can now sign in.';
                this.registerForm.reset();
            },
            error: (error) => {
                this.isLoading = false;
                this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
            }
        });
    }

    get f() {
        return this.registerForm.controls;
    }
}
