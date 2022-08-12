import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../cores/services/auth/auth.service';
import { CompanyService } from '../../cores/services/http/company.service';
import { ClientService } from '../../cores/services/http/client.service';

@Component({
  selector: 'app-single-company',
  templateUrl: './single-company.component.html',
  styleUrls: ['./single-company.component.css']
})
export class SingleCompanyComponent implements OnInit {

  company: any;
  info = JSON.parse(localStorage.getItem('info'));
  message: any = null;
  onService = false;

  demandeModal?: BsModalRef;

  demandeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    public authService: AuthService, 
    private companyService: CompanyService, 
    private clientService: ClientService, 
    private route: ActivatedRoute, 
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.getCompany(this.route.snapshot.params['id']);
    this.initDemandeForm();
  }

  getCompany(id) {
    this.companyService.getSingleCompany(id)
    .subscribe(
      (data) => {
        this.company = data;
        this.onService = true;
      },
      (error) => {
        console.log('Upps!!! Une erreur c\'est produit : '+error);
      }
      );
  }

  initDemandeForm() {
    this.demandeForm = this.formBuilder.group({
      object : ["", Validators.required],
      service : ["", Validators.required],
      dateExecution : ["", Validators.required],
      message : ["", Validators.required]
    });
  }

  saveDemande() {
    // console.log({...this.demandeForm.value, user: this.user._id, entreprise: this.company._id})
    if(this.demandeForm.valid) {
      this.clientService.addDemande({...this.demandeForm.value, client: this.info._id, entreprise: this.company._id})
      .subscribe(
        (data) => {
          this.offDemandeModal();
          this.message = {info: 'success', message: 'Ajout réussit.'};
        },
        (error) => {
          this.message = {info: 'danger', message: 'Une erreur est survenue.'};
        });
    }
  }

  onDemandeModal(template) {
    this.demandeModal = this.modalService.show(template, {backdrop: true, ignoreBackdropClick: true});
  }

  offDemandeModal() {
    this.demandeModal.hide();
  }

}
