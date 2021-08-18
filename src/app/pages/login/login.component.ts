import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { User } from "../../core/models/user";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MessageService } from "primeng/api";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,private ngxLoaderRef: NgxUiLoaderService,public messageServiceRef: MessageService) {}
  errormessage = "";
  ngOnInit(): void {}

  onLogin(credentials: { username: string; password: string }) {
  this.ngxLoaderRef.start();
    this.errormessage = "";
    this.authService
      .login(credentials.username, credentials.password)
      .subscribe({
        next: (val: any) => {
          this.ngxLoaderRef.stop();
          if (!val) {
            this.errormessage = "Invalid userid/password.";
          } else {
            let user: any = {
              accessToken: val.accessToken,
              tokenType: val.tokenType,
            };
            this.authService.setCurrentUser(user, true);
          }
        },
        error: (err) => {
          this.ngxLoaderRef.stop();
          this.errormessage = "Invalid userid/password..Please try again.";
        },
      });
  }
}
