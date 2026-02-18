import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-language-switch',
    standalone: true,
    template: `
        <div class="language-switch">
            <button
                class="btn btn-sm"
                [class.active]="currentLang() === 'tr'"
                (click)="switchLang('tr')">
                TR
            </button>
            <button
                class="btn btn-sm"
                [class.active]="currentLang() === 'en'"
                (click)="switchLang('en')">
                EN
            </button>
        </div>
    `,
    styles: [`
        .language-switch {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1050;
            display: flex;
            gap: 0.25rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 0.5rem;
            padding: 0.25rem;
            border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            padding: 0.25rem 0.625rem;
            border: 1px solid transparent;
            border-radius: 0.375rem;
            transition: all 0.2s ease;
        }

        .btn:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.15);
        }

        .btn.active {
            color: #fff;
            background: rgba(99, 102, 241, 0.8);
            border-color: rgba(99, 102, 241, 0.6);
        }
    `]
})
export class LanguageSwitchComponent {
    currentLang = signal('tr');

    constructor(private translate: TranslateService) {
        this.currentLang.set(this.translate.currentLang || this.translate.defaultLang || 'tr');
    }

    switchLang(lang: string): void {
        this.translate.use(lang);
        this.currentLang.set(lang);
    }
}
