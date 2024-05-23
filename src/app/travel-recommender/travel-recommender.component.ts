import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Destination } from '../../models/Destination'; // Adjust the import path as necessary
import { destinations } from '../../models/destinations'; // Adjust the import path as necessary
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-travel-recommender',
  templateUrl: './travel-recommender.component.html',
  styleUrls: ['./travel-recommender.component.css']
})
export class TravelRecommenderComponent implements OnInit {
  travelForm!: FormGroup;
  recommendations: Destination[] = [];
  noMatches: boolean = false; // To track if no matches were found
  destinations: Destination[] = destinations;
  public currentIndex: number = 0;
  submitted: boolean = false; // Track if the form is submitted

  constructor(private fb: FormBuilder, private translate: TranslateService, private translationService: TranslationService) {
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    if (browserLang && browserLang.match(/en|fr/)) {
      this.translate.use(browserLang);
    } else {
      this.translate.use('en');
    }
  }

  ngOnInit(): void {
    this.travelForm = this.fb.group({
      budget: ['', Validators.required],
      climate: ['', Validators.required],
      activities: [[], Validators.required],
      duration: ['', Validators.required]
    });
  }

  setSlide(index: number): void {
    this.currentIndex = index;
    this.updateCarousel();
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.recommendations.length - 1;
    this.updateCarousel();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex < this.recommendations.length - 1) ? this.currentIndex + 1 : 0;
    this.updateCarousel();
  }

  private updateCarousel(): void {
    const slidesContainer = document.querySelector('.slides') as HTMLElement;
    slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  getRecommendations(): void {
    const userPreferences = this.travelForm.value;
    console.log('User Preferences:', userPreferences);

    this.recommendations = this.destinations.filter((destination: Destination) => {
      return destination.budget === userPreferences.budget &&
        destination.climate === userPreferences.climate &&
        destination.activities.some((activity: string) => userPreferences.activities.includes(activity)) &&
        destination.duration.includes(userPreferences.duration);
    });

    console.log('Filtered Recommendations:', this.recommendations);

    // Update noMatches flag based on recommendations length
    this.noMatches = this.recommendations.length === 0;
    this.submitted = true; // Set submitted to true upon form submission
    this.translateRecommendations(); // Translate the recommendations after filtering
    this.updateCarousel(); // Update the carousel after setting recommendations
  }

  translateRecommendations(): void {
    const userLanguage = navigator.language.split('-')[0];  // Get browser language

    this.recommendations.forEach(recommendation => {
      this.translationService.translate(recommendation.highlights, userLanguage).subscribe({
        next: (translatedText: string) => recommendation.translatedHighlights = translatedText,
        error: (error: any) => console.error('Translation error for highlights:', error)
      });

      this.translationService.translate(recommendation.best_time_to_visit, userLanguage).subscribe({
        next: (translatedText: string) => recommendation.translatedBestTimeToVisit = translatedText,
        error: (error: any) => console.error('Translation error for best time to visit:', error)
      });

      const translatedAttractions: string[] = [];
      recommendation.key_attractions.forEach(attraction => {
        this.translationService.translate(attraction, userLanguage).subscribe({
          next: (translatedText: string) => translatedAttractions.push(translatedText),
          error: (error: any) => console.error('Translation error for key attractions:', error)
        });
      });
      recommendation.translatedKeyAttractions = translatedAttractions;
    });
  }


  getImageUrl(destination: string): string {
    const imageUrls: { [key: string]: string } = {
      "Bali, Indonesia": "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Reykjavik, Iceland": "https://images.pexels.com/photos/1009136/pexels-photo-1009136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Paris, France": "https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Kyoto, Japan": "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Cape Town, South Africa": "https://images.pexels.com/photos/60692/bird-animal-nature-strauss-60692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Sydney, Australia": "https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Cusco, Peru": "https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "New York City, USA": "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Barcelona, Spain": "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
     
      "Marrakech, Morocco": "https://images.pexels.com/photos/3581916/pexels-photo-3581916.jpeg",
      "Lisbon, Portugal": "https://images.pexels.com/photos/1547735/pexels-photo-1547735.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Dubai, UAE": "https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Rome, Italy": "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Havana, Cuba": "https://images.pexels.com/photos/92871/pexels-photo-92871.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Santorini, Greece": "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Banff, Canada": "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Buenos Aires, Argentina": "https://images.pexels.com/photos/1308659/pexels-photo-1308659.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Bangkok, Thailand": "https://images.pexels.com/photos/161183/thailand-monks-temple-tourism-161183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Amsterdam, Netherlands": "https://images.pexels.com/photos/1187911/pexels-photo-1187911.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Vienna, Austria": "https://images.pexels.com/photos/1493088/pexels-photo-1493088.jpeg?auto=compress&cs=tinysrgb&w=400",
      
      "Istanbul, Turkey": "https://images.pexels.com/photos/879478/pexels-photo-879478.jpeg?auto=compress&cs=tinysrgb&w=400",
      
      "Seoul, South Korea": "https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Rio de Janeiro, Brazil": "https://images.pexels.com/photos/2771080/pexels-photo-2771080.jpeg?auto=compress&cs=tinysrgb&w=400",
      
      "Stockholm, Sweden": "https://images.pexels.com/photos/33612/sailboat-water-stockholm-ship.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Mexico City, Mexico": "https://images.pexels.com/photos/784707/pexels-photo-784707.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Kuala Lumpur, Malaysia": "https://images.pexels.com/photos/94420/pexels-photo-94420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Prague, Czech Republic": "https://images.pexels.com/photos/161077/prague-vencel-square-czech-republic-church-161077.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Dubrovnik, Croatia": "https://images.pexels.com/photos/210536/pexels-photo-210536.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Munich, Germany": "https://images.pexels.com/photos/547494/pexels-photo-547494.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Hong Kong": "https://images.pexels.com/photos/6456847/pexels-photo-6456847.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Edinburgh, Scotland": "https://images.pexels.com/photos/848748/pexels-photo-848748.jpeg?auto=compress&cs=tinysrgb&w=400",
      
      "Moscow, Russia": "https://images.pexels.com/photos/236294/pexels-photo-236294.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Shanghai, China": "https://images.pexels.com/photos/1586205/pexels-photo-1586205.jpeg?auto=compress&cs=tinysrgb&w=400",
      "Copenhagen, Denmark": "https://images.pexels.com/photos/416024/pexels-photo-416024.jpeg?auto=compress&cs=tinysrgb&w=400"
    };

    return imageUrls[destination] || "https://via.placeholder.com/300x200?text=Destination";
  }
}