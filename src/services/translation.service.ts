import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2';
  private apiKey = 'AIzaSyCYgNSfgpqKqH5j2_66nsoQopJzEiFhA3I';

  constructor(private http: HttpClient) { }

  translate(text: string, targetLanguage: string): Observable<string> {
    const body = {
      q: text,
      target: targetLanguage,
      format: 'text'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}?key=${this.apiKey}`, body, { headers }).pipe(
      map(response => {
        console.log('API Response:', response); // Add this line for debugging
        return response.data.translations[0].translatedText;
      })
    );
  }
}
