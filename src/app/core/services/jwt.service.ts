import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";
import { User } from "../models/user";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
  providedIn: "root",
})
export class JWTService {
  constructor(private localService: SessionStorageService) {}

  getDecodedToken() {
    const user: any = this.localService.getItem<User>("user");
    if (user && !user.accessToken) {
      return {};
    }
    const decoded = user && jwt_decode(user.accessToken);
    return decoded;
  }
}
