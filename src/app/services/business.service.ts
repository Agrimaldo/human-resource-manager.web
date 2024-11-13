import { Injectable } from '@angular/core';
import { Business } from '../interfaces/business.interface';
import { Observable } from 'rxjs';
import { SessionVariables } from '../../shared/enumerators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor() { }

  public Create(data: Business): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      setTimeout(() => {
        sessionStorage.setItem(SessionVariables.CurrentBussiness, JSON.stringify(data));
        observer.next(true);
        observer.complete();
      }, 2000);
    });
  }

  public Get(): Observable<Business> {
    return new Observable<Business>((observer) => {
      setTimeout(() => {
        const dataBusiness = sessionStorage.getItem(SessionVariables.CurrentBussiness);
        observer.next(dataBusiness ? JSON.parse(dataBusiness) as Business : undefined);
        observer.complete();
      }, 200);
    });
  }
}
