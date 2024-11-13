import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../interfaces/account.interface';
import { SessionVariables } from '../../shared/enumerators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor() { }

  public Create(data: Account): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      setTimeout(() => {
        sessionStorage.setItem(SessionVariables.CurrentAccount, JSON.stringify(data));
        observer.next(true);
        observer.complete();
      }, 2000);
    });
  }

  public Update(data: Account): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      setTimeout(() => {
        sessionStorage.setItem(SessionVariables.CurrentAccount, JSON.stringify(data));
        observer.next(true);
        observer.complete();
      }, 2000);
    });
  }

  public Get(): Observable<Account> {
    return new Observable<Account>((observer) => {
      setTimeout(() => {
        const dataAccount = sessionStorage.getItem(SessionVariables.CurrentAccount);
        observer.next(dataAccount ? JSON.parse(dataAccount) as Account : undefined);
        observer.complete();
      }, 200);
    });
  }
}
