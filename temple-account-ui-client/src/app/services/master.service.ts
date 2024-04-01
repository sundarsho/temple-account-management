import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/userdetails.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {    
  
  }

  GetUsers():Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8080/temple/v1/users");
  }

  GetUserById(userId:any){
    return this.http.get("http://localhost:8080/temple/v1/user?userId="+userId);
  }

  deleteUser(userId:any){
    return this.http.delete("http://localhost:8080/temple/v1/user/delete?userId="+userId);
  }

  saveUser(user: User){
    let headers = new HttpHeaders();
    return this.http.post("http://localhost:8080/temple/v1/user/save",user, {
      headers: headers
    })
  }

}
