import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { API_URL } from "src/app/modules/shared/constants/urls";
import { User } from "../models/user";
import { SessionStorageService } from "./session-storage.service";

const USER = "user";
const CUSTOMER_SELECTIONS = "selectedCustomer";
const APPROVAL = "approval";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  private currentNotificationSubject: BehaviorSubject<number | null>;

  public currentUser: Observable<User | null>;
  public currentNotification: Observable<number | null>;

  constructor(
    private http: HttpClient,
    private localService: SessionStorageService,
    private sessionService: SessionStorageService,
    private route: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentNotificationSubject = new BehaviorSubject<number | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentNotification = this.currentNotificationSubject.asObservable();
  }
  private API_URL = API_URL;
  login(userid: string, password: string) {
    //api call to get user
    //return this.http.get('https://jsonplaceholder.typicode.com/todos/1')
    // .subscribe((item)=>{
    //   console.log(item)
    // })
    // let user:User = {
    //   firstName:'user_name',
    //   lastName:'user_name',
    //   isAuthenticated:true,
    //   role:'role'
    // }
    // this.currentUserSubject.next(user)
    var payload = {
      username: userid,
      password: password,
    };
    return this.http.post(API_URL + "/signin", payload);
  }

  setCurrentUser(user: User, store_locally = false) {
    if (store_locally) {
      this.localService.createItem<User>(USER, user);
    } else {
      this.sessionService.createItem<User>(USER, user);
    }
    this.currentUserSubject.next(user);
  }
  setCurrentNotification(number: any) {
    this.currentNotificationSubject.next(number);
  }
  getCurrentNotification() {
    return this.currentNotificationSubject.value;
  }
  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  loadLocaluser() {
    let user =
      this.sessionService.getItem<User>(USER) ||
      this.localService.getItem<User>(USER);
    this.currentUserSubject.next(user);
  }

  logout() {
    this.currentUserSubject.next(null);
    this.sessionService.deleteItem(USER);
    this.localService.deleteItem(USER);
    this.localService.deleteItem(APPROVAL);
    this.localService.deleteItem(CUSTOMER_SELECTIONS);
    this.route.navigate(["/login"]);
  }
}
