import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { User } from '../models/userdetails.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  baseUrl!: string;

  onNgInit(): void{
    
  }

  constructor(private http: HttpClient) {    
    this.baseUrl = "http://localhost:8080/temple/v1";
  }

  GetUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+"/users");
  }

  GetUserById(userId:any){
    return this.http.get(this.baseUrl+"/user?userId="+userId);
  }

  deleteUser(userId:any){
    return this.http.delete(this.baseUrl+"/user/delete?userId="+userId);
  }

  saveUser(user: User){
    let headers = new HttpHeaders();
    return this.http.post(this.baseUrl+"/user/save",user, {
      headers: headers
    })
  }

  searchUser(params: HttpParams):Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+"/user/search?"+params.toString());
  }

}
