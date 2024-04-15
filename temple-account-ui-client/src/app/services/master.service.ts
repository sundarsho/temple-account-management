import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Member } from '../models/temple.model';
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

  GetMembers():Observable<Member[]>{
    return this.http.get<Member[]>(this.baseUrl+"/members");
  }

  GetMemberById(memberId:any){
    return this.http.get<Member>(this.baseUrl+"/member?memberId="+memberId);
  }

  deleteMember(memberId:any){
    return this.http.delete(this.baseUrl+"/member/delete?memberId="+memberId);
  }

  saveMember(member: Member){
    let headers = new HttpHeaders();
    return this.http.post(this.baseUrl+"/member/save",member, {
      headers: headers
    })
  }

  searchMember(params: HttpParams):Observable<Member[]>{
    return this.http.get<Member[]>(this.baseUrl+"/member/search?"+params.toString());
  }

  exportMembersToCsv(): Observable<Blob> {
    return this.http.get(this.baseUrl+"/member/export", { responseType: 'blob' });
  }

}
