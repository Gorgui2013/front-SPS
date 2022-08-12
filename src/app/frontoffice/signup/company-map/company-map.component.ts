import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-company-map',
  templateUrl: './company-map.component.html',
  styleUrls: ['./company-map.component.css']
})
export class CompanyMapComponent implements AfterViewInit {

  private map;
  @Output() mark = new EventEmitter<any>();

  marker;

  constructor() { }

  ngAfterViewInit(): void {
    this.getLocation();
  }

  private initMap(latitude, longitude): void {
    this.map = L.map('map', {
      center: [ latitude, longitude ],
      zoom: 13,
      attributionControl:true
    });

    const myIcon = L.icon({
      iconUrl: '../../../assets/map-icon.png',
      iconSize: [55, 60],
      iconAnchor: [20, 22],
    });

    let marker = L.marker([latitude, longitude], {
      icon: myIcon,
      draggable: true,
      autoPan: true
    }).bindTooltip("Votre position actuelle")
    .openTooltip();

    marker.addTo(this.map);

    marker.on('dragend', async (e) => {
      this.marker = marker;
      await this.sendPosition(this.marker);
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; SenProxiService'
    }).addTo(this.map);

  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.initMap(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  sendPosition(marker) {
    this.mark.emit(marker);
  }

}
