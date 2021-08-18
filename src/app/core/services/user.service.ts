import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/modules/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
  }
forgotPassword(payload){
 return this.http.post(API_URL+'/api/reset/forget-password',payload)
}
resetPassword(payload){
  return this.http.post(API_URL+'/api/reset/reset-password',payload)
}
}
