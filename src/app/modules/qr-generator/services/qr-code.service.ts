import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { API_URL } from "../../shared/constants/urls";

@Injectable({
  providedIn: "root",
})
export class QrCodeService {
  constructor(public httpRef: HttpClient) {}
  uploadFile(payload) {
    return this.httpRef.post(`${API_URL}/api/palliyakal/uploadFile`, payload);
  }
  getFarmerList() {
    return this.httpRef.get(`${API_URL}/api/palliyakal/getAllInfo`);
  }
  saveQr(payload) {
    console.log(payload);
    return this.httpRef.post(`${API_URL}/api/palliyakal/insertQR`, payload);
  }
  delete(){
    return this.httpRef.delete(`${API_URL}/api/palliyakal/deleteAllDetails`);
  }
  deleteCustomer(payload){
    return this.httpRef.delete(`${API_URL}/api/palliyakal/deleteParticularCustomer`,{params:payload});

  }
}
