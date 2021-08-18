import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { User } from "./core/models/user";
import { AuthService } from "./core/services/auth.service";
import { JWTService } from "./core/services/jwt.service";
import {MessageService} from 'primeng/api';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Palliyakal";
  showHeader = true;
  showNavbar = false;
  headerText = "";
  currentUser: User | null = null;
  mainHeader=false;
  show:false;
  size:number=50
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private jwt: JWTService,
    private messageService: MessageService
  ) {
    this.authService.currentUser.subscribe((user) => {
      if (user && user.accessToken) {
        const UserDetails: any = jwt.getDecodedToken();
        this.currentUser = UserDetails;
        this.router.navigate(["/qrCode/list"]);
      }
    });
  }

  ngOnInit() {
    this.authService.loadLocaluser();
    this.router.events.subscribe((event) => {
      if(window.location.pathname.includes('/safetoeatkerala')){
        this.mainHeader=true;
      }
      this.showNavbar =
        this.activatedRoute.firstChild?.snapshot.data.showNavbar == true;
      this.headerText =
        this.activatedRoute.firstChild?.snapshot.data.headerText;
    });
  }
  ngAfterContentInit(){
  }
}
