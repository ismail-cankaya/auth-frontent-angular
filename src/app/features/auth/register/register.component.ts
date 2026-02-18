import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/auth.models';
import { LanguageSwitchComponent } from '../../../shared/components/language-switch/language-switch.component';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule, LanguageSwitchComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {

    registerForm: FormGroup;
    isLoading = signal(false);
    errorMessage = signal<string>('');
    successMessage = signal<string>('');
    showPassword = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private translate: TranslateService
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

        this.isLoading.set(true);
        this.errorMessage.set('');
        this.successMessage.set('');

        const request: RegisterRequest = this.registerForm.value;

        this.authService.register(request).subscribe({
            next: (response) => {
                this.isLoading.set(false);
                this.successMessage.set(
                    response.message || this.translate.instant('REGISTER.ERRORS.SUCCESS')
                );
                this.registerForm.reset();
            },
            error: (error) => {
                this.isLoading.set(false);
                this.errorMessage.set(
                    error.error?.message || this.translate.instant('REGISTER.ERRORS.DEFAULT')
                );
            }
        });
    }

    get f() {
        return this.registerForm.controls;
    }
}
