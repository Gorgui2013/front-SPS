import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CompanyService } from '../../cores/services/http/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  companies: any = [];
  
  constructor(private companyService: CompanyService, private route: Router) { }

  ngOnInit(): void {
    this.emitCompanies();
  }

  emitCompanies() {
    this.companyService.getCompanies()
    .subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.log('Upps!!! Une erreur c\'est produit : '+error);
      }
      );
  }

  goToCompany(company) {
    this.route.navigate(['/company', company._id]);
  }

}
