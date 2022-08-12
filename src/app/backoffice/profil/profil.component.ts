import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ClientService } from '../../cores/services/http/client.service';
import { CompanyService } from '../../cores/services/http/company.service';
import { AuthService } from '../../cores/services/auth/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  onEdit = false;
  user = JSON.parse(localStorage.getItem('user'));
  info = JSON.parse(localStorage.getItem('info'));

  clientForm: FormGroup;
  companyForm: FormGroup;
  userForm: FormGroup;
  profilForm: FormGroup;

  secteurs: any;

  markerX: number;
  markerY: number;

  constructor(
    public authService: AuthService, 
    private formBuilder: FormBuilder,
    private clientService: ClientService, 
    private companyService: CompanyService
    ) { }

  ngOnInit(): void {
    this.initClientForm();
    this.initCompanyForm();
    this.initUserForm();
    this.initProfilForm();

    this.emitSecteurs();
  }

  getMark(e) {
    this.markerX = e.getLatLng().lat;
    this.markerY = e.getLatLng().lng;
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
      firstname : [this.info.firstname, Validators.required],
      lastname : [this.info.lastname, Validators.required],
      sexe : [this.info.sexe, Validators.required],
      phone : [this.info.phone, Validators.required],
      email : [this.info.email, [Validators.required, Validators.email]],
    });
  }

  // formulaire mise à jour profil
  initProfilForm() {
    this.profilForm = this.formBuilder.group({
      profil : [""],
    });
  }

  // formulaire d'ajout d'entreprise
  initCompanyForm() {
    this.companyForm = this.formBuilder.group({
      name : [this.info.name, Validators.required],
      secteur : ["", Validators.required],
      description : [this.info.description, Validators.required],
      phone : [this.info.phone, Validators.required],
      email : [this.info.email, [Validators.required, Validators.email]],
      address : [this.info.adresse, Validators.required],
    });
  }

  // formulaire d'ajout d'utilisateur
  initUserForm() {
    this.userForm = this.formBuilder.group({
      password : ["", Validators.required],
      passwordConfirm : ["", Validators.required],
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.profilForm.get('profil').setValue(file);
    }
  }

  // fonction de souvegarde de client
  saveProfil() {
    const formData = new FormData();
    formData.append('profil', this.profilForm.get('profil').value);

    this.companyService.setProfil(this.info._id, formData)
    .subscribe(
      (data) => {
        console.log('Ajout faite avec avec Succés.');
      },
      (error) => {
        console.log('Upps ! Une erreur est survenu.');
      });
  }

  // fonction de souvegarde de client
  saveClient() {
    this.clientService.setClient(this.info._id, this.clientForm.value)
    .subscribe(
      (data) => {
        console.log('Ajout faite avec avec Succés.');
      },
      (error) => {
        console.log('Upps ! Une erreur est survenu.');
      });
  }

  // fonction de souvegarde d'entreprise
  saveCompany() {
    this.companyService.setCompany(this.info._id, this.companyForm.value)
    .subscribe(
      (data) => {
        console.log('Ajout faite avec avec Succés.');
      },
      (error) => {
        console.log('Upps ! Une erreur est survenu.');
      });
  }

  // fonction de souvegarde d'utilisateur
  saveUser() {
    this.authService.setUser(this.user._id, this.userForm.value)
    .subscribe(
      (data) => {
        console.log('Ajout faite avec avec Succés.');
      },
      (error) => {
        console.log('Upps ! Une erreur est survenu.');
      });
  }

  checkOnEdit(value) {
    this.onEdit = value;
  }

}
