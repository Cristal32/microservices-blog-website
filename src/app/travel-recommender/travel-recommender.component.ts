import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Destination {
  destination: string;
  budget: string;
  climate: string;
  activities: string[];
  duration: string[];
  highlights: string;
  best_time_to_visit: string;
  key_attractions: string[];
}

@Component({
  selector: 'app-travel-recommender',
  templateUrl: './travel-recommender.component.html',
  styleUrls: ['./travel-recommender.component.css']
})
export class TravelRecommenderComponent {
  travelForm: FormGroup;
  recommendations: Destination[] = [];
  noMatches: boolean = false;  // To track if no matches were found

  destinations: Destination[] = [
    {
      destination: "Bali, Indonesia",
      budget: "medium",
      climate: "warm",
      activities: ["beach", "culture", "adventure"],
      duration: ["1_week", "2_weeks"],
      highlights: "Beautiful beaches, vibrant culture, stunning temples",
      best_time_to_visit: "April to October",
      key_attractions: ["Uluwatu Temple", "Seminyak Beach"]
    },
    {
      destination: "Reykjavik, Iceland",
      budget: "high",
      climate: "cold",
      activities: ["hiking", "adventure", "culture"],
      duration: ["1_week", "2_weeks", "more_than_2_weeks"],
      highlights: "Breathtaking landscapes, geothermal spas, northern lights",
      best_time_to_visit: "June to August for hiking, October to March for northern lights",
      key_attractions: ["Blue Lagoon", "Golden Circle"]
    },
    {
      destination: "Paris, France",
      budget: "medium",
      climate: "temperate",
      activities: ["city_tours", "culture"],
      duration: ["weekend", "1_week"],
      highlights: "Iconic landmarks, world-class museums, charming cafes",
      best_time_to_visit: "April to June, September to November",
      key_attractions: ["Eiffel Tower", "Louvre Museum"]
    },
    {
      destination: "Kyoto, Japan",
      budget: "medium",
      climate: "temperate",
      activities: ["culture", "city_tours"],
      duration: ["1_week", "2_weeks"],
      highlights: "Historic temples, beautiful gardens, traditional tea houses",
      best_time_to_visit: "March to May, October to November",
      key_attractions: ["Fushimi Inari Shrine", "Kinkaku-ji Temple"]
    },
    {
      destination: "Cape Town, South Africa",
      budget: "low",
      climate: "warm",
      activities: ["beach", "adventure", "hiking"],
      duration: ["1_week", "2_weeks", "more_than_2_weeks"],
      highlights: "Stunning landscapes, beautiful beaches, vibrant city life",
      best_time_to_visit: "November to March",
      key_attractions: ["Table Mountain", "Robben Island"]
    },
    {
      destination: "Sydney, Australia",
      budget: "high",
      climate: "warm",
      activities: ["beach", "city_tours", "adventure"],
      duration: ["1_week", "2_weeks"],
      highlights: "Iconic landmarks, beautiful beaches, vibrant nightlife",
      best_time_to_visit: "September to November, March to May",
      key_attractions: ["Sydney Opera House", "Bondi Beach"]
    },
    {
      destination: "Cusco, Peru",
      budget: "low",
      climate: "cold",
      activities: ["hiking", "adventure", "culture"],
      duration: ["1_week", "2_weeks"],
      highlights: "Historic sites, beautiful landscapes, rich culture",
      best_time_to_visit: "May to September",
      key_attractions: ["Machu Picchu", "Sacsayhuaman"]
    },
    {
      destination: "New York City, USA",
      budget: "high",
      climate: "temperate",
      activities: ["city_tours", "culture", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Iconic landmarks, world-class museums, vibrant nightlife",
      best_time_to_visit: "April to June, September to November",
      key_attractions: ["Statue of Liberty", "Central Park"]
    },
    {
      destination: "Barcelona, Spain",
      budget: "medium",
      climate: "warm",
      activities: ["beach", "culture", "city_tours"],
      duration: ["weekend", "1_week"],
      highlights: "Historic architecture, beautiful beaches, vibrant nightlife",
      best_time_to_visit: "May to June, September to October",
      key_attractions: ["Sagrada Familia", "Park Güell"]
    },
    {
      destination: "Queenstown, New Zealand",
      budget: "high",
      climate: "cold",
      activities: ["adventure", "hiking"],
      duration: ["1_week", "2_weeks", "more_than_2_weeks"],
      highlights: "Stunning landscapes, adventure sports, vibrant nightlife",
      best_time_to_visit: "December to February, June to August",
      key_attractions: ["Lake Wakatipu", "Skyline Queenstown"]
    },
    {
      destination: "Marrakech, Morocco",
      budget: "low",
      climate: "warm",
      activities: ["culture", "city_tours"],
      duration: ["weekend", "1_week"],
      highlights: "Historic palaces, vibrant markets, rich culture",
      best_time_to_visit: "March to May, September to November",
      key_attractions: ["Jemaa el-Fnaa", "Bahia Palace"]
    },
    {
      destination: "Lisbon, Portugal",
      budget: "low",
      climate: "warm",
      activities: ["city_tours", "culture", "beach"],
      duration: ["weekend", "1_week"],
      highlights: "Historic neighborhoods, beautiful coastlines, vibrant nightlife",
      best_time_to_visit: "March to May, September to October",
      key_attractions: ["Belem Tower", "Alfama District"]
    },
    {
      destination: "Dubai, UAE",
      budget: "high",
      climate: "warm",
      activities: ["adventure", "shopping", "city_tours"],
      duration: ["weekend", "1_week"],
      highlights: "Modern architecture, luxury shopping, desert adventures",
      best_time_to_visit: "November to April",
      key_attractions: ["Burj Khalifa", "Dubai Mall"]
    },
    {
      destination: "Rome, Italy",
      budget: "medium",
      climate: "warm",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Ancient ruins, vibrant culture, delicious cuisine",
      best_time_to_visit: "April to June, September to October",
      key_attractions: ["Colosseum", "Vatican City"]
    },
    {
      destination: "Havana, Cuba",
      budget: "low",
      climate: "warm",
      activities: ["culture", "beach", "city_tours"],
      duration: ["1_week", "2_weeks"],
      highlights: "Historic architecture, vibrant culture, beautiful beaches",
      best_time_to_visit: "November to April",
      key_attractions: ["Old Havana", "Malecon"]
    },
    {
      destination: "Santorini, Greece",
      budget: "medium",
      climate: "warm",
      activities: ["beach", "culture", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Stunning sunsets, beautiful beaches, historic ruins",
      best_time_to_visit: "April to October",
      key_attractions: ["Oia Village", "Akrotiri Ruins"]
    },
    {
      destination: "Banff, Canada",
      budget: "high",
      climate: "cold",
      activities: ["hiking", "adventure", "culture"],
      duration: ["1_week", "2_weeks", "more_than_2_weeks"],
      highlights: "Stunning landscapes, vibrant wildlife, outdoor adventures",
      best_time_to_visit: "June to August, December to March",
      key_attractions: ["Lake Louise", "Banff National Park"]
    },
    {
      destination: "Buenos Aires, Argentina",
      budget: "low",
      climate: "temperate",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["1_week", "2_weeks"],
      highlights: "Vibrant culture, beautiful architecture, delicious cuisine",
      best_time_to_visit: "March to May, September to November",
      key_attractions: ["La Boca", "Recoleta Cemetery"]
    },
    {
      destination: "Bangkok, Thailand",
      budget: "low",
      climate: "warm",
      activities: ["city_tours", "culture", "shopping"],
      duration: ["weekend", "1_week"],
      highlights: "Vibrant city life, historic temples, delicious street food",
      best_time_to_visit: "November to February",
      key_attractions: ["Grand Palace", "Wat Arun"]
    },
    {
      destination: "Amsterdam, Netherlands",
      budget: "medium",
      climate: "temperate",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Historic canals, world-class museums, vibrant nightlife",
      best_time_to_visit: "April to May, September to November",
      key_attractions: ["Rijksmuseum", "Anne Frank House"]
    },
    {
      destination: "Vienna, Austria",
      budget: "high",
      climate: "cold",
      activities: ["culture", "city_tours"],
      duration: ["weekend", "1_week"],
      highlights: "Imperial palaces, historic architecture, classical music",
      best_time_to_visit: "April to May, September to October",
      key_attractions: ["Schönbrunn Palace", "St. Stephen's Cathedral"]
    },
    {
      destination: "Vancouver, Canada",
      budget: "high",
      climate: "temperate",
      activities: ["hiking", "adventure", "city_tours"],
      duration: ["1_week", "2_weeks"],
      highlights: "Stunning landscapes, vibrant city life, outdoor adventures",
      best_time_to_visit: "March to May, September to November",
      key_attractions: ["Stanley Park", "Granville Island"]
    },
    {
      destination: "Istanbul, Turkey",
      budget: "low",
      climate: "warm",
      activities: ["culture", "city_tours"],
      duration: ["weekend", "1_week"],
      highlights: "Historic sites, vibrant bazaars, delicious cuisine",
      best_time_to_visit: "April to May, September to November",
      key_attractions: ["Hagia Sophia", "Topkapi Palace"]
    },
    {
      destination: "Auckland, New Zealand",
      budget: "medium",
      climate: "temperate",
      activities: ["adventure", "hiking", "city_tours"],
      duration: ["1_week", "2_weeks", "more_than_2_weeks"],
      highlights: "Stunning landscapes, vibrant city life, outdoor adventures",
      best_time_to_visit: "March to May, September to November",
      key_attractions: ["Sky Tower", "Waiheke Island"]
    },
    {
      destination: "Seoul, South Korea",
      budget: "medium",
      climate: "cold",
      activities: ["culture", "city_tours", "shopping"],
      duration: ["weekend", "1_week"],
      highlights: "Historic palaces, vibrant city life, delicious cuisine",
      best_time_to_visit: "March to May, September to November",
      key_attractions: ["Gyeongbokgung Palace", "Bukchon Hanok Village"]
    },
    {
      destination: "Rio de Janeiro, Brazil",
      budget: "low",
      climate: "warm",
      activities: ["beach", "adventure", "culture"],
      duration: ["1_week", "2_weeks"],
      highlights: "Stunning beaches, vibrant culture, iconic landmarks",
      best_time_to_visit: "December to March",
      key_attractions: ["Christ the Redeemer", "Copacabana Beach"]
    },
    {
      destination: "Athens, Greece",
      budget: "medium",
      climate: "warm",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Ancient ruins, vibrant culture, delicious cuisine",
      best_time_to_visit: "March to May, September to November",
      key_attractions: ["Acropolis", "Parthenon"]
    },
    {
      destination: "Stockholm, Sweden",
      budget: "high",
      climate: "cold",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Historic architecture, vibrant city life, beautiful waterways",
      best_time_to_visit: "May to September",
      key_attractions: ["Vasa Museum", "Gamla Stan"]
    },
    {
      destination: "Mexico City, Mexico",
      budget: "low",
      climate: "warm",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["1_week", "2_weeks"],
      highlights: "Historic sites, vibrant culture, delicious cuisine",
      best_time_to_visit: "March to May, September to November",
      key_attractions: ["Zocalo", "Teotihuacan"]
    },
    {
      destination: "Kuala Lumpur, Malaysia",
      budget: "low",
      climate: "warm",
      activities: ["city_tours", "shopping", "culture"],
      duration: ["weekend", "1_week"],
      highlights: "Modern architecture, vibrant city life, diverse cuisine",
      best_time_to_visit: "May to July, December to February",
      key_attractions: ["Petronas Towers", "Batu Caves"]
    },
    {
      destination: "Prague, Czech Republic",
      budget: "low",
      climate: "cold",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Historic architecture, vibrant culture, stunning landscapes",
      best_time_to_visit: "May to September",
      key_attractions: ["Charles Bridge", "Prague Castle"]
    },
    {
      destination: "Dubrovnik, Croatia",
      budget: "medium",
      climate: "warm",
      activities: ["beach", "culture", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Stunning coastlines, historic sites, vibrant culture",
      best_time_to_visit: "May to October",
      key_attractions: ["Old Town", "Walls of Dubrovnik"]
    },
    {
      destination: "Munich, Germany",
      budget: "medium",
      climate: "cold",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Historic architecture, vibrant culture, world-class museums",
      best_time_to_visit: "May to September",
      key_attractions: ["Marienplatz", "Neuschwanstein Castle"]
    },
    {
      destination: "Hong Kong",
      budget: "high",
      climate: "warm",
      activities: ["city_tours", "shopping", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Stunning skyline, vibrant city life, diverse cuisine",
      best_time_to_visit: "October to December",
      key_attractions: ["Victoria Peak", "Tsim Sha Tsui Promenade"]
    },
    {
      destination: "Edinburgh, Scotland",
      budget: "medium",
      climate: "cold",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Historic sites, stunning landscapes, vibrant culture",
      best_time_to_visit: "May to September",
      key_attractions: ["Edinburgh Castle", "Royal Mile"]
    },
    {
      destination: "Florence, Italy",
      budget: "medium",
      climate: "temperate",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Renaissance art, historic architecture, vibrant culture",
      best_time_to_visit: "May to September",
      key_attractions: ["Uffizi Gallery", "Cathedral of Santa Maria del Fiore"]
    },
    {
      destination: "Moscow, Russia",
      budget: "low",
      climate: "cold",
      activities: ["culture", "city_tours"],
      duration: ["weekend", "1_week"],
      highlights: "Historic sites, vibrant culture, stunning architecture",
      best_time_to_visit: "May to September",
      key_attractions: ["Red Square", "Saint Basil's Cathedral"]
    },
    {
      destination: "Shanghai, China",
      budget: "high",
      climate: "warm",
      activities: ["city_tours", "shopping", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Modern architecture, vibrant city life, diverse cuisine",
      best_time_to_visit: "October to December",
      key_attractions: ["The Bund", "Yu Garden"]
    },
    {
      destination: "Copenhagen, Denmark",
      budget: "high",
      climate: "cold",
      activities: ["culture", "city_tours", "adventure"],
      duration: ["weekend", "1_week"],
      highlights: "Historic architecture, vibrant culture, beautiful waterways",
      best_time_to_visit: "May to September",
      key_attractions: ["Nyhavn", "Tivoli Gardens"]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.travelForm = this.fb.group({
      budget: ['', Validators.required],
      climate: ['', Validators.required],
      activities: [[], Validators.required],
      duration: ['', Validators.required]
    });
  }

  getRecommendations() {
    const userPreferences = this.travelForm.value;
    console.log('User Preferences:', userPreferences);

    this.recommendations = this.destinations.filter(destination => {
      return destination.budget === userPreferences.budget &&
        destination.climate === userPreferences.climate &&
        destination.activities.some(activity => userPreferences.activities.includes(activity)) &&
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