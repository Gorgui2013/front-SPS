import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { SearchService } from '../../cores/services/http/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  companies: any = [];
  secteurs: any = [];

  isOk = false;

  selectedCompany: any;
  searchForm: FormGroup;

  constructor(public searchService: SearchService, private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.emitSecteurs();
    this.search();
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      secteur : [''],
      service : [''],
      entreprise : ['']
    });
  }

  emitSecteurs() {
    this.searchService.getSecteurs()
    .subscribe(
      (data) => {
        this.secteurs = data;
      },
      (error) => {
        console.log('Upps!!! Une erreur c\'est produit : '+error);
      }
      );
  }

  search() {
    this.isOk = false;
    this.searchService.search(this.searchForm.value)
    .subscribe(
      (data) => {
        this.companies = this.orderedCompanies(data);
        this.isOk = true;
      },
      (error) => {
        console.log("Upps !, Une erreur c'est produite.");
      }
      );
  }

  orderedCompanies(data) {
    let c = Array();
    for(const i of data) {
      c.push({
        _id: i._id,
        name: i.name,
        description: i.description,
        adresse: i.adresse.name,
        profil: i.profil.replaceAll("\\",'/'),
        // services: i.services,
        latitude: i.adresse.point.latitude,
        longitude: i.adresse.point.longitude
      });
    }

    return c;
  }

  goToCompany(company) {
    this.route.navigate(['/company', company._id]);
  }

  hoverCompany(company) {
    this.selectedCompany = company;
  }

}
