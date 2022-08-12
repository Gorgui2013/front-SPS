import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "http://localhost:8081/";
  // apiUrl = "https://laboniang.com/api/";

  constructor(private _http: HttpClient) {}

  // requêtes simple

  obtenir(endpoint: string) {
    return this._http.get(this.apiUrl + endpoint)
    .pipe(
      // retry(3),
      catchError(this.handleError)
      );
  }

  ajouter(endpoint: string, data: Object): Observable<any> {
    return this._http.post(this.apiUrl + endpoint, data)
    .pipe(
      catchError(this.handleError)
      );
  }

  modifier(endpoint: string, data: Object): Observable<any> {
    return this._http.put(this.apiUrl + endpoint, data)
    .pipe(
      catchError(this.handleError)
      );
  }

  modifierSimple(endpoint: string, data: any): Observable<any> {
    return this._http.patch(this.apiUrl + endpoint, data)
    .pipe(
      catchError(this.handleError)
      );
  }

  supprimer(endpoint: string): Observable<any> {
    return this._http.delete(this.apiUrl + endpoint)
    .pipe(
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Une erreur c\'est produite:', error.error);
      // console.log(error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error('Backend returned code '+ error.status +', body was: ' + error.error.detail);
    }
    // Return an observable with a user-facing error message.
    return throwError(error.status);
  }
}
