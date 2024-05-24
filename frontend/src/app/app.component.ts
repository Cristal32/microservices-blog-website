import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    
    // Use browser language if available and falls back to 'en' if not matched
    const browserLang = this.translate.getBrowserLang();
    if (browserLang && browserLang.match(/en|fr/)) {
      this.translate.use(browserLang);
    } else {
      this.translate.use('en');
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  title = 'my-app';
}
