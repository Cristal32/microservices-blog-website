import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  latitude: number = 0.0;
  longitude: number = 0.0;

  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };
  markerPosition = { lat: this.latitude, lng: this.longitude };

  // Constructor
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.latitude = Number(this.route.snapshot.paramMap.get('lat'));
    this.longitude = Number(this.route.snapshot.paramMap.get('lng'));
    this.options.center = { lat: this.latitude, lng: this.longitude };
    this.markerPosition = { lat: this.latitude, lng: this.longitude };
  }
}
