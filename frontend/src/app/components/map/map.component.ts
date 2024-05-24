import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  selectMap: boolean = false;
  latitude: number = 0.0;
  longitude: number = 0.0;
  markerPosition: google.maps.LatLngLiteral | null = null;

  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const lat = +params['lat'];
      const lng = +params['lng'];
      this.selectMap = params['selectMap'] === true;

      console.log("lat: " + this.latitude + " long: " + this.longitude); // => 0

      // Check if latitude and longitude are valid
      if (!isNaN(lat) && !isNaN(lng)) {
        this.latitude = lat;
        this.longitude = lng;
        console.log("lat: " + this.latitude + " long: " + this.longitude);
        this.options.center = { lat: this.latitude, lng: this.longitude };
        this.markerPosition = { lat: this.latitude, lng: this.longitude };
      } else {
        // Fallback to query parameters
        this.route.queryParams.subscribe(queryParams => {
          const queryLat = +queryParams['lat'];
          const queryLng = +queryParams['lng'];
          if (!isNaN(queryLat) && !isNaN(queryLng)) {
            this.latitude = queryLat;
            this.longitude = queryLng;
            console.log("lat: " + this.latitude + " long: " + this.longitude);
            this.options.center = { lat: this.latitude, lng: this.longitude };
            this.markerPosition = { lat: this.latitude, lng: this.longitude };
          }
        });
      }
    });
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.markerPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    }
  }

  confirmLocation(): void {
    if (this.markerPosition) {
      const { lat, lng } = this.markerPosition;
      this.router.navigate(['/home'], { queryParams: { lat, lng } });
    }
  }
}
