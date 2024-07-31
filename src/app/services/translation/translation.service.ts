import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  public setLanguage(lang: string) {
    this.translate.use(lang);
  }

  public getCurrentLanguage() {
    let getCurrentLanguage = localStorage.getItem('lang');
    if (getCurrentLanguage === null) {
      localStorage.setItem('lang', 'en');
    } else {
      this.setLanguage(getCurrentLanguage);
    }
    console.log('Language checked');
  }
}
