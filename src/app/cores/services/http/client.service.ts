import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private api: ApiService) {}

  getClients() {
    return this.api.obtenir('clients');
  }

  getSingleClient(id: string) {
    return this.api.obtenir('clients/'+id);
  }

  addClient(client: any): Observable<any> {
    return this.api.ajouter('clients', client);
  }

  setClient(id: string, client: any): Observable<any> {
    return this.api.modifierSimple('clients/' + id, client);
  }

  removeClient(client: any): Observable<any> {
    return this.api.supprimer('clients/' + client._id);
  }

  getDemandes(id) {
    return this.api.obtenir('clients/'+id+'/demandes');
  }

  addDemande(demande: any): Observable<any> {
    return this.api.ajouter('demandes', demande);
  }

  setDemande(id: string, demande: any): Observable<any> {
    return this.api.modifierSimple('demandes/' + id, demande);
  }

  removeDemande(demande: any): Observable<any> {
    return this.api.supprimer('demandes/' + demande._id);
  }
}
