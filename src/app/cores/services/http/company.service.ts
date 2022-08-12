import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private api: ApiService) {}

  getCompanys() {
    return this.api.obtenir('entreprises');
  }

  getSingleCompany(id: string) {
    return this.api.obtenir('entreprises/'+id);
  }

  addCompany(company: any): Observable<any> {
    return this.api.ajouter('entreprises', company);
  }

  setCompany(id: string, company: any): Observable<any> {
    return this.api.modifierSimple('entreprises/' + id, company);
  }

  setCover(id: string, cover: any): Observable<any> {
    return this.api.ajouter('entreprises/' + id + '/cover', cover);
  }

  setProfil(id: string, profil: any): Observable<any> {
    return this.api.ajouter('entreprises/' + id + '/profil', profil);
  }

  removeCompany(company: any): Observable<any> {
    return this.api.supprimer('entreprises/' + company.id);
  }

  // Secteurs

  getSecteurs() {
    return this.api.obtenir('secteurs');
  }

  // address

  addAddress(address: any): Observable<any> {
    return this.api.ajouter('adresses', address);
  }

  // address

  addPoint(point: any): Observable<any> {
    return this.api.ajouter('points', point);
  }

  // Services

  getServicesOfCompany(id): Observable<any> {
    return this.api.obtenir('entreprises/'+id+'/services');
  }

  addService(service: any): Observable<any> {
    return this.api.ajouter('services', service);
  }

  setService(id, service: any): Observable<any> {
    return this.api.modifierSimple('services/'+id, service);
  }

  removeService(service): Observable<any> {
    return this.api.supprimer('services/'+service._id);
  }

  addServiceToCompany(id, service: any): Observable<any> {
    return this.api.ajouter('entreprises/'+id, service);
  }

  // Demandes

  getDemandes(id) {
    return this.api.obtenir('entreprises/'+id+'/demandes');
  }

  setDemande(id: string, demande: any): Observable<any> {
    return this.api.modifierSimple('demandes/' + id, demande);
  }
}
