import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private api: ApiService) {}

  search(data) {
    return this.api.obtenir('search?secteur='+data.secteur+'&service='+data.service+'&entreprise='+data.entreprise);
  }

  getSecteurs() {
    return this.api.obtenir('secteurs');
  }
}
