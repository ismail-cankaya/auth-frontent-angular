import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styles: [':host { display: block; }']
})
export class App {
  // 2. CONSTRUCTOR BLOĞUNU EKLE
  constructor(private translate: TranslateService) {
    // Bu dilleri desteklediğimizi sisteme bildiriyoruz
    translate.addLangs(['tr', 'en']);

    // Eğer çeviri bulunamazsa yedek olarak bunu kullan (Sigorta)
    translate.setDefaultLang('tr');

    // Tarayıcının dilini al (Örn: Chrome Türkçe ise 'tr', İngilizce ise 'en' gelir)
    const browserLang = translate.getBrowserLang();

    // Tarayıcı dili 'tr' veya 'en' ise onu kullan, yoksa direkt 'tr' yap.
    translate.use(browserLang?.match(/tr|en/) ? browserLang : 'tr');
  }
}
