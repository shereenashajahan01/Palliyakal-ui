import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { JWTService } from "../../services/jwt.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  role: string = "";
  @Input()
  currentUser: User | null = null;
  constructor(
    private router: Router,
    private domSanitizer: DomSanitizer,
    private jwt: JWTService
  ) {}

  ngOnInit(): void {
    const UserDetails: any = this.jwt && this.jwt.getDecodedToken();
    this.currentUser = UserDetails;
    if (this.currentUser && this.currentUser.role) {
      this.role = this.currentUser.role;
    }
  }
}
