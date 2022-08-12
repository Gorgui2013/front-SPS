import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CompanyService } from '../../cores/services/http/company.service';
import { ClientService } from '../../cores/services/http/client.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  demandes: any = [];
  selectedDemande = {
    _id: null,
    object: null,
    dateExecution: null,
    message: null,
    service: null
  };
  info = JSON.parse(localStorage.getItem('info'));
  user = JSON.parse(localStorage.getItem('user'));

  demandeModal?: BsModalRef;

  demandeForm: FormGroup;

  message: any = null;

  constructor(
    public companyService: CompanyService, 
    public clientService: ClientService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    if(this.user.role === 'COMPANY') {
      this.getDemandesCompany(0);
    } else {
      this.getDemandesClient(0);
    }
    this.initDemandeForm();
  }

  initDemandeForm() {
    this.demandeForm = this.formBuilder.group({
      object : [this.selectedDemande.object, Validators.required],
      dateExecution : [this.selectedDemande.dateExecution, Validators.required],
      message : [this.selectedDemande.message, Validators.required]
    });
  }

  getDemandesClient(etat) {
    this.clientService.getDemandes(this.info._id)
    .subscribe(
      (data) => {
        if(etat === 0) {
          this.demandes = data;
        } else {
          this.demandes = data;
          this.demandes = this.demandes.filter(elt => elt.etat == etat);
        }
      },
      (error) => {
        console.log('Upps!!! Une erreur c\'est produit : '+error);
      }
      );
  }

  getDemandesCompany(etat) {
    this.companyService.getDemandes(this.info._id)
    .subscribe(
      (data) => {
        if(etat === 0) {
          this.demandes = data;
        } else {
          this.demandes = data;
          this.demandes = this.demandes.filter(elt => elt.etat == etat);
        }
      },
      (error) => {
        console.log('Upps!!! Une erreur c\'est produit : '+error);
      }
      );
  }

  getColorEtat(etat) {
    switch(etat) {
      case 1: return '#FFC107'; break;
      case 2: return '#33CF06'; break;
      case 1: return '#eee'; break;
      default: break;
    }
  }

  saveDemande() {
    if(this.demandeForm.valid) {
      this.clientService.setDemande(this.selectedDemande._id, this.demandeForm.value)
      .subscribe(
        (data) => {
          if(this.user.role === 'COMPANY') {
            this.getDemandesCompany(0);
          } else {
            this.getDemandesClient(0);
          }
          this.offDemandeModal();
          this.message = {info: 'success', message: 'Modification réussit.'};
        },
        (error) => {
          this.message = {info: 'danger', message: 'Une erreur est survenue.'};
        });
    }
  }

  deleteDemande(demande) {
    this.clientService.removeDemande(demande)
    .subscribe(
      (data) => {
        if(this.user.role === 'COMPANY') {
          this.getDemandesCompany(0);
        } else {
          this.getDemandesClient(0);
        }
        this.message = {info: 'success', message: 'Suppression réussit.'};
      },
      (error) => {
        this.message = {info: 'danger', message: 'Une erreur est survenue.'};
      });
  }

  valideDemande(demande) {
    this.companyService.setDemande(demande._id, {etat: 2})
    .subscribe(
      (data) => {
        this.getDemandesCompany(0);
        this.message = {info: 'success', message: 'Validation réussit.'};
      },
      (error) => {
        this.message = {info: 'danger', message: 'Une erreur est survenue.'};
      });
  }

  archiveDemande(demande) {
    this.companyService.setDemande(demande._id, {etat: 3})
    .subscribe(
      (data) => {
        this.getDemandesCompany(0);
        this.message = {info: 'success', message: 'Archivage réussit.'};
      },
      (error) => {
        this.message = {info: 'danger', message: 'Une erreur est survenue.'};
      });
  }

  onDemandeModal(demande, template) {
    this.selectedDemande = demande;
    this.demandeModal = this.modalService.show(template, {backdrop: true, ignoreBackdropClick: true});
  }

  offDemandeModal() {
    this.demandeModal.hide();
  }

}
