import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder,private translate: TranslateService,
    ) {
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

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
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
  }
  
  getImageUrl(destination: string): string {
    const imageUrls: { [key: string]: string } = {
      "Bali, Indonesia": "https://via.placeholder.com/300x200?text=Bali",
      "Reykjavik, Iceland": "https://via.placeholder.com/300x200?text=Reykjavik",
      "Paris, France": "https://via.placeholder.com/300x200?text=Paris",
      "Kyoto, Japan": "https://via.placeholder.com/300x200?text=Kyoto",
      "Cape Town, South Africa": "https://via.placeholder.com/300x200?text=Cape+Town",
      "Sydney, Australia": "https://via.placeholder.com/300x200?text=Sydney",
      "Cusco, Peru": "https://via.placeholder.com/300x200?text=Cusco",
      "New York City, USA": "https://via.placeholder.com/300x200?text=New+York+City",
      "Barcelona, Spain": "https://via.placeholder.com/300x200?text=Barcelona",
      "Queenstown, New Zealand": "https://via.placeholder.com/300x200?text=Queenstown",
      "Marrakech, Morocco": "https://via.placeholder.com/300x200?text=Marrakech",
      "Lisbon, Portugal": "https://via.placeholder.com/300x200?text=Lisbon",
      "Dubai, UAE": "https://via.placeholder.com/300x200?text=Dubai",
      "Rome, Italy": "https://via.placeholder.com/300x200?text=Rome",
      "Havana, Cuba": "https://via.placeholder.com/300x200?text=Havana",
      "Santorini, Greece": "https://via.placeholder.com/300x200?text=Santorini",
      "Banff, Canada": "https://via.placeholder.com/300x200?text=Banff",
      "Buenos Aires, Argentina": "https://via.placeholder.com/300x200?text=Buenos+Aires",
      "Bangkok, Thailand": "https://via.placeholder.com/300x200?text=Bangkok",
      "Amsterdam, Netherlands": "https://via.placeholder.com/300x200?text=Amsterdam",
      "Vienna, Austria": "https://via.placeholder.com/300x200?text=Vienna",
      "Vancouver, Canada": "https://via.placeholder.com/300x200?text=Vancouver",
      "Istanbul, Turkey": "https://via.placeholder.com/300x200?text=Istanbul",
      "Auckland, New Zealand": "https://via.placeholder.com/300x200?text=Auckland",
      "Seoul, South Korea": "https://via.placeholder.com/300x200?text=Seoul",
      "Rio de Janeiro, Brazil": "https://via.placeholder.com/300x200?text=Rio+de+Janeiro",
      "Athens, Greece": "https://via.placeholder.com/300x200?text=Athens",
      "Stockholm, Sweden": "https://via.placeholder.com/300x200?text=Stockholm",
      "Mexico City, Mexico": "https://via.placeholder.com/300x200?text=Mexico+City",
      "Kuala Lumpur, Malaysia": "https://via.placeholder.com/300x200?text=Kuala+Lumpur",
      "Prague, Czech Republic": "https://via.placeholder.com/300x200?text=Prague",
      "Dubrovnik, Croatia": "https://via.placeholder.com/300x200?text=Dubrovnik",
      "Munich, Germany": "https://via.placeholder.com/300x200?text=Munich",
      "Hong Kong": "https://via.placeholder.com/300x200?text=Hong+Kong",
      "Edinburgh, Scotland": "https://via.placeholder.com/300x200?text=Edinburgh",
      "Florence, Italy": "https://via.placeholder.com/300x200?text=Florence",
      "Moscow, Russia": "https://via.placeholder.com/300x200?text=Moscow",
      "Shanghai, China": "https://via.placeholder.com/300x200?text=Shanghai",
      "Copenhagen, Denmark": "https://via.placeholder.com/300x200?text=Copenhagen"
    };

    return imageUrls[destination] || "https://via.placeholder.com/300x200?text=Destination";
  }
}