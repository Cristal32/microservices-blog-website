import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://translation.googleapis.com/language/translate/v2'; // Example API URL

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslationService]
    });

    service = TestBed.inject(TranslationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should translate text', () => {
    // Mock response from the API
    const mockResponse = {
      data: {
        translations: [
          { translatedText: 'Bonjour' } // Mock translated text
        ]
      }
    };
    
    // Call the translate method
    service.translate('Hello', 'fr').subscribe(translatedText => {
      // Expect that the translated text matches the mocked response
      expect(translatedText).toBe('Bonjour');
    });

    // Expect that a request is made to the correct API URL with the correct parameters
    const req = httpMock.expectOne(`${apiUrl}?q=Hello&target=fr&key=113513530618390261946`);
    expect(req.request.method).toBe('GET'); // Expect a GET request
    req.flush(mockResponse); // Flush the mocked response
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding requests
  });
});
