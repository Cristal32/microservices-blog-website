// src/app/test/test.component.ts
import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-test',
  template: `
    <div>
      <h2>Test Translation Service</h2>
      <input [(ngModel)]="textToTranslate" placeholder="Text to translate">
      <input [(ngModel)]="targetLanguage" placeholder="Target language">
      <button (click)="translate()">Translate</button>
      <p *ngIf="translatedText">Translated Text: {{ translatedText }}</p>
    </div>
  `,
  styles: []
})
export class TestComponent implements OnInit {
  textToTranslate: string = '';
  targetLanguage: string = '';
  translatedText: string = '';

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void { }

  translate(): void {
    this.translationService.translate(this.textToTranslate, this.targetLanguage).subscribe({
      next: (translatedText: string) => this.translatedText = translatedText,
      error: (error: any) => console.error('Translation error:', error)
    });
  }
}
