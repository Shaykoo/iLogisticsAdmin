import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(userData : any): Observable<any>{
    return this.http.get(environment.apiUrl+`/logilite/validate-user?company=JB&userCode=${userData.userCode}&location=0&password=${userData.password}`)
  }

  get isAuthenticated(): boolean {
    const user = localStorage.getItem('STAFF_CODE');

    return (user !== null && user !== undefined) ? true : false;
  }
}
