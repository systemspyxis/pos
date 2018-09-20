import { Injectable } from '@angular/core';
import {AppSettings} from '../models/app-settings';
import{Observable} from 'rxjs';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, retry} from 'rxjs/operators';
import { of } from 'rxjs/index';



@Injectable({
  providedIn: 'root'
})
export class AppService {
  appSettings:AppSettings;
  constructor(private http: HttpClient) { }
  getSettings(): Observable<AppSettings> {
    return this.http.get<AppSettings>("../../assets/appsettings.json")
      .pipe(
        catchError(this.handleError('getSettings',this.appSettings))
      );
  }

 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumptio
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
