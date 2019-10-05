import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Register } from './register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  selectedUsers: Register;
  Users: Register[];

  readonly baseURL = 'http://localhost:3000/users/register';

  constructor(private http: HttpClient) {   }

  postUsers(user: Register) {

    let headers: any = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.baseURL, user, {headers: headers})
  }
 
  ngOninit(){}

}

