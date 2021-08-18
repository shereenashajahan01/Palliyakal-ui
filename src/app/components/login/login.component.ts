import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MessageService } from "primeng/api";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-login-comp",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  @Output()
  loginEvent = new EventEmitter<{
    username: string;
    password: string;
  }>();

  @Input()
  error: string = "";
  display:boolean=false;
  checked: boolean = false;
  loginForm: FormGroup;
  forgotForm: FormGroup;
  show: boolean = false;
  submitted: boolean = false;
  hide: boolean = true;
  constructor(private fb: FormBuilder,private userService:UserService,
    private ngxLoaderRef: NgxUiLoaderService,public messageServiceRef: MessageService) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      remember: [false],
    });
    this.forgotForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}
  get loginFormControl() {
    return this.loginForm.controls;
  }
  get forgotFormControl() {
    return this.forgotForm.controls;
  }
  toggleShow() {
    this.show = !this.show;
  }

  get f() {
    return this.loginForm.controls;
  }
  get fc() {
    return this.forgotForm.controls;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginEvent.emit(this.loginForm.value);
    }
  }
Forgot(){
  if (this.forgotForm.valid) {
    this.ngxLoaderRef.start();
    this.userService.forgotPassword(this.forgotForm.value).subscribe((res:any)=>{
      if(res){
        this.display=false;
        this.ngxLoaderRef.stop();
      this.messageServiceRef.add({severity:'success', summary:'Service Message', detail:res.Response});
      }
    },(err:any)=>{
      console.log(err)
      this.messageServiceRef.add({severity:'error', summary:'Service Message', detail:err});
      this.ngxLoaderRef.stop();
    })
  }
}
  onChange() {
    this.error = "";
  }
}
