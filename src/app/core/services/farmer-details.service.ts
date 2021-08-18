import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/modules/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FarmerDetailsService {

  constructor(private http: HttpClient) { }
  getFarmerDetails(id){
    var payload={
      code:id
    }
   return this.http.get(`${API_URL}/api/palliyakal/id`,{params:payload})
  }
}
