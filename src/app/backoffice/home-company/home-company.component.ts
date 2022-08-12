import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CompanyService } from '../../cores/services/http/company.service';

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent implements OnInit {

  serviceForm: FormGroup;
  message: any = null;
  
  company = JSON.parse(localStorage.getItem('info'));
  services: any[];
  selectedService = {
    _id: null,
    name: null,
    description: null,
    image: null
  };

  serviceModal?: BsModalRef;

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCompany(this.company._id);
    this.emitServices();
    this.initServiceForm();
  }

  getCompany(id) {
    this.companyService.getSingleCompany(id)
    .subscribe(
      (data) => {
        this.company = data;
        localStorage.setItem('info', JSON.stringify(this.company))
      },
      (error) => {
        console.log('Upps!!! Une erreur c\'est produit : '+error);
      }
      );
  }

  // formulaire d'ajout de client
  initServiceForm() {
    this.serviceForm = this.formBuilder.group({
      name : [this.selectedService.name, Validators.required],
      description : [this.selectedService.description, Validators.required],
      image : [this.selectedService.image, Validators.required]
    });
  }

  emitServices() {
    this.companyService.getServicesOfCompany(this.company._id)
    .subscribe(
      (data) => {
        this.services = data;
      },
      (error) => {
        console.log('Upps!!! Une erreur c\'est produit : '+error);
      }
      );
  }

  onViewService(service, template: TemplateRef<any>, option) {
    if(option === "add") {
      this.selectedService = {
        _id: null,
        name: null,
        description: null,
        image: null
      };
    } else {
      this.selectedService = service;
    }
    this.serviceModal = this.modalService.show(template, {backdrop: true, ignoreBackdropClick: true})
  }

  editCompany(serviceId) {
    this.companyService.addServiceToCompany(this.company._id, JSON.parse('{"service": "'+serviceId+'"}'))
    .subscribe(
      (data) => {
          this.message = {info: 'success', message: 'Ajout réussit.'};
          this.serviceForm.reset();
          this.closeModal();
          this.emitServices();
      },
      (error) => {
        this.message = {info: 'danger', message: 'Une erreur est survenue.'};
      });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.serviceForm.get('image').setValue(file);
    }
  }

  saveService() {
    if(this.selectedService._id === null) {
      if(this.serviceForm.valid) {
        const formData = new FormData();
        formData.append('image', this.serviceForm.get('image').value);
        formData.append('name', this.serviceForm.get('name').value);
        formData.append('description', this.serviceForm.get('description').value);

        this.companyService.addService(formData)
        .subscribe(
          (data) => {
            this.editCompany(data._id);
            // this.message = {info: 'success', message: 'Ajout réussit.'};
          },
          (error) => {
            this.message = {info: 'danger', message: 'Une erreur est survenue.'};
          });
      }
    } else {
      console.log (this.selectedService._id)
      if(this.serviceForm.valid) {
        this.companyService.setService(this.selectedService._id, this.serviceForm.value)
        .subscribe(
          (data) => {
            this.closeModal();
            this.message = {info: 'success', message: 'Ajout réussit.'};
          },
          (error) => {
            this.message = {info: 'danger', message: 'Une erreur est survenue.'};
          });
      }
    }
  }

  deleteService(service) {
    this.companyService.removeService(service)
    .subscribe(
      (data) => {
        this.emitServices();
        this.message = {info: 'success', message: 'Suppression réussit.'};
      },
      (error) => {
        this.message = {info: 'danger', message: 'Une erreur est survenue.'};
      });
  }

  closeModal() {
    this.serviceModal.hide();
  }

}
