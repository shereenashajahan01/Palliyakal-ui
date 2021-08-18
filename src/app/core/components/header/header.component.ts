import { Component, OnInit, Input, OnChanges, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { User } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../../environments/environment";
import { JWTService } from "../../services/jwt.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  //private _currentUser:User|null = null
  @Input()
  headerText: string = "";
  version = environment.version;
  role: string = "";
  activeNotification: any;
  // get currentUser() {
  //   return this._currentUser
  // }

  // @Input()
  // set currentUser(val:User|null) {

  //   this._currentUser = val;
  //   if(val && val.isAuthenticated) {
  //     this.isAuthenticated = true
  //   }
  //   else{
  //     this.isAuthenticated = false
  //   }
  // }

  // isAuthenticated:boolean = false

  @Input()
  currentUser: User | null = null;
  constructor(private domSanitizer: DomSanitizer, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.currentNotification.subscribe((notification) => {
      this.activeNotification = notification;
    });
  }

  // TODO : dummy function to prevent click
  noLink(event: any) {
    event.preventDefault();
  }

  onLogout(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.auth.logout();
    this.currentUser = null;
  }
}
