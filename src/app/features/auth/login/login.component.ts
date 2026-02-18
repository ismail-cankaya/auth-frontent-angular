import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/auth.models';
import { LanguageSwitchComponent } from '../../../shared/components/language-switch/language-switch.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule, LanguageSwitchComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    loginForm: FormGroup;
    isLoading = signal(false);
    errorMessage = signal<string>('');
    showPassword = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private translate: TranslateService
    ) {
        this.loginForm = this.fb.group({
            identifier: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false]
        });
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set('');

        const request: LoginRequest = {
            identifier: this.loginForm.value.identifier,
            password: this.loginForm.value.password
        };

        this.authService.login(request).subscribe({
            next: (response) => {
                this.isLoading.set(false);
                // Token storage and redirect will be implemented later
                console.log('Login successful:', response);
            },
            error: (error) => {
                this.isLoading.set(false);
                this.errorMessage.set(
                    error.error?.message || this.translate.instant('LOGIN.ERRORS.DEFAULT')
                );
            }
        });
    }

    get f() {
        return this.loginForm.controls;
    }
}
