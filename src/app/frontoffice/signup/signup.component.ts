import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientService } from '../../cores/services/http/client.service';
import { CompanyService } from '../../cores/services/http/company.service';
import { AuthService } from '../../cores/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  step: number = 0;
  profil: string = '';
  secteurs: any;
  selectorId: string;
  email: string;
  addressId: string;

  error: string = null;
  success: string = null;

  clientForm: FormGroup;
  companyForm: FormGroup;
  userForm: FormGroup;
  validationForm: FormGroup;

  markerX: number = 0;
  markerY: number = 0;

  constructor(
    private formBuilder: FormBuilder, 
    private clientService: ClientService, 
    private companyService: CompanyService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initClientForm();
    this.initCompanyForm();
    this.initUserForm();
    this.initValidationForm();

    this.emitSecteurs();
  }

  // recupération de la liste des utilisateurs
  emitSecteurs() {
    this.companyService.getSecteurs()
    .subscribe(
      (data) => {
        this.secteurs = data;
      },
      (error) => {
        console.log('Upps!!! Une erreur c\'est produit : '+error);
      }
      );
  }

  // formulaire d'ajout de client
  initClientForm() {
    this.clientForm = this.formBuilder.group({
      firstname : ["", Validators.required],
      lastname : ["", Validators.required],
      sexe : ["", Validators.required],
      phone : ["", Validators.required],
      email : ["", [Validators.required, Validators.email]],
    });
  }

  // formulaire d'ajout d'entreprise
  initCompanyForm() {
    this.companyForm = this.formBuilder.group({
      name : ["", Validators.required],
      secteur : ["", Validators.required],
      description : ["", Validators.required],
      phone : ["", Validators.required],
      email : ["", [Validators.required, Validators.email]],
      address : ["", Validators.required],
    });
  }

  // formulaire d'ajout d'utilisateur
  initUserForm() {
    this.userForm = this.formBuilder.group({
      username : ["", Validators.required],
      password : ["", Validators.required],
      passwordConfirm : ["", Validators.required],
    });
  }

  // formulaire de validation d'email
  initValidationForm() {
    this.validationForm = this.formBuilder.group({
      code : ["", Validators.required],
    });
  }

  // fonction de recupération du role de l'utilisateur
  getRole() {
    switch(this.profil) {
      case 'client': return "USER"; break;
      case 'company': return "COMPANY"; break;
      default: break;
    }
  }

  // fonction de souvegartd de client
  saveClient() {
    if (this.clientForm.valid) {
      this.clientService.addClient(JSON.parse(
        '{"firstname": "'+this.clientForm.get('firstname').value+
        '", "lastname": "'+this.clientForm.get('lastname').value+
        '", "sexe": "'+this.clientForm.get('sexe').value+
        '", "phone": "'+this.clientForm.get('phone').value+
        '", "email": "'+this.clientForm.get('email').value+
        // '", "user": "'+this.userId+
        '"}'))
      .subscribe(
        (data) => {
          this.selectorId = data._id;
          this.email = data.email;
          // console.log (data)
          this.next('client');
          console.log('Ajout faite avec avec Succés.');
        },
        (error) => {
          this.error = error;
        });
    }
  }

  // fonction de souvegarde d'entreprise
  saveCompany() {
    if (this.companyForm.valid) {
      this.companyService.addCompany(JSON.parse(
        '{"name": "'+this.companyForm.get('name').value+
        '", "description": "'+this.companyForm.get('description').value+
        '", "phone": "'+this.companyForm.get('phone').value+
        '", "email": "'+this.companyForm.get('email').value+
        '", "address": "'+this.companyForm.get('address').value+
        '", "secteur": "'+this.companyForm.get('secteur').value+
        '", "adresse": "'+this.addressId+
        '"}'))
      .subscribe(
        (data) => {
          this.selectorId = data._id;
          this.email = data.email;
          // console.log (data)
          this.next('company');
          console.log('Ajout faite avec avec Succés.');
        },
        (error) => {
          this.error = error;
        });
    }
  }

  saveAddress(pointId) {
    this.companyService.addAddress(JSON.parse(
      '{"name": "'+ this.companyForm.get('address').value +
      '","point": "'+ pointId +
      '"}'))
    .subscribe(
      (data) => {
        this.addressId = data._id;
        this.saveCompany();
        console.log('Ajout faite avec avec Succés.');
      },
      (error) => {
        this.error = error;
      });
  }

  savePoint() {
    this.companyService.addPoint(JSON.parse(
      '{"latitude": "'+ this.markerX +
      '","longitude": "'+ this.markerY +
      '"}'))
    .subscribe(
      (data) => {
        this.saveAddress(data._id);
        console.log('Ajout faite avec avec Succés.');
      },
      (error) => {
        this.error = error;
      });
  }

  // mise à jours client pour ajouter userId
  editClient(userId) {
    this.clientService.setClient(this.selectorId, JSON.parse('{"user": "'+userId+'"}'))
    .subscribe(
      (data) => {
        console.log('Ajout faite avec avec Succés.');
      },
      (error) => {
          this.error = error;
      });
  }

  // mise à jours company pour ajouter userId
  editCompany(userId) {
      this.companyService.setCompany(this.selectorId, JSON.parse('{"user": "'+userId+'"}'))
      .subscribe(
        (data) => {
          console.log('Ajout faite avec avec Succés.');
        },
        (error) => {
          this.error = error;
        });
  }

  // fonction de souvegarde d'utilisateur
  saveUser() {
    if (this.userForm.valid) {
      this.authService.register(JSON.parse(
        '{"role": "'+ this.getRole() +
        '","username": "'+ this.userForm.get('username').value +
        '","password": "'+ this.userForm.get('password').value +
        '","email": "'+ this.email +
        '"}'))
      .subscribe(
        (data) => {
          if(this.profil === 'client') {
            this.editClient(data._id);
          }
          if(this.profil === 'company') {
            this.editCompany(data._id);
          }
          this.next(this.profil);
          console.log('Ajout faite avec avec Succés.');
        },
        (error) => {
          this.error = error;
        });
    }
  }

  getMark(e) {
    this.markerX = e.getLatLng().lat;
    this.markerY = e.getLatLng().lng;
  }


  validation() {
    if (this.validationForm.valid) {
      this.authService.validation(JSON.parse('{"username":"'+this.userForm.get('username').value+'", "code": "'+this.validationForm.get('code').value+'"}'))
      .subscribe(
        (data) => {
          this.success = "Verification réussit! Vous pouvez vous connecter !"
          this.next(this.profil);
          // console.log('Ajout faite avec avec Succés.');
        },
        (error) => {
          this.error = error;
        }
        );
    }
  }

  // fonction suivant
  next(profil: string) {
    this.profil = profil;
    this.step += 1;
  }

  // fonction précédence
  previous() {
    this.step -= 1;
  }

}
