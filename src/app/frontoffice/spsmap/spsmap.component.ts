import { Component, AfterViewInit, Input, OnChanges, SimpleChange } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-spsmap',
  templateUrl: './spsmap.component.html',
  styleUrls: ['./spsmap.component.css']
})
export class SpsmapComponent implements AfterViewInit  {

  private map;
  @Input() companies;
  @Input() company;
  oldCompany: any;

  initTooltipClass = {'className': 'initMapClass'};
  afterTooltipClass = {'className': 'afterMapClass'};
  
  constructor() { }

  ngAfterViewInit(): void {
    this.getLocation();
  }

  addMarkers() {
    const companyIcon = L.icon({
      iconUrl: '../../../assets/map-company.png',
      iconSize: [30, 35],
      iconAnchor: [13, 15],
    });

    for(const i of this.companies) {
      const m = L.marker([i.latitude, i.longitude], {icon: companyIcon});
      m.addTo(this.map);
      i.marker = m;
    }
  }

  ngOnChanges(changes: SimpleChange) {
    if(this.company && this.company != this.oldCompany) {
      // console.log (changes['company'].currentValue)
      if(this.oldCompany) {
        this.oldCompany.marker.unbindTooltip();
      }
      this.oldCompany = this.company;
      this.company.marker
      .bindTooltip("<strong style='padding: 20px; text-align: center'>"+changes['company'].currentValue.name+"</strong><hr style='margin: 0;'>"+changes['company'].currentValue.adresse, {
          direction: 'top',
          offset: [2, -10],
          ...this.afterTooltipClass
        }).openTooltip();
    }
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

    L.marker([latitude, longitude], {icon: myIcon})
    .addTo(this.map)
    .bindTooltip("Votre position actuelle")
    .openTooltip();

    this.addMarkers();

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


}
