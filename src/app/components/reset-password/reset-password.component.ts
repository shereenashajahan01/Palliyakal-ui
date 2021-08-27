import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { ConfirmPasswordValidator } from 'src/app/core/services/confirm-password-validator';
import { JWTService } from 'src/app/core/services/jwt.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  error: string = "";
  submitted:boolean=false;
  hide: boolean = true;
  token="";
  userDetails:any
  constructor(private router: Router,private fb: FormBuilder,private userService:UserService,private jwt: JWTService,
    private activatedRoute: ActivatedRoute,private ngxLoaderRef: NgxUiLoaderService,public messageServiceRef: MessageService) { 
    this.resetForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", Validators.required],
    },{ validator: ConfirmPasswordValidator("password", "confirmPassword")});
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });
   this.userDetails= this.jwt.getDecodedToken();
   console.log(this.userDetails)
  }

  get resetFormControl() {
    return this.resetForm.controls;
  }
  get f() {
    return this.resetForm.controls;
  }
  onSubmit(){
    if (this.resetForm.invalid) {
      return;
    }
    this.ngxLoaderRef.start();
    var payload={
      token:this.token,
      username:this.resetForm.value.username,
      password:this.resetForm.value.password
    }
  this.userService.resetPassword(payload).subscribe((res:any)=>{
    if(res){
      this.ngxLoaderRef.stop();
    this.successNotification(res.Response);
    this.router.navigate(["/login"]);
    }
  },()=>{
    this.ngxLoaderRef.stop();
  })
  }
  onChange() {
    this.error = "";
  }
  successNotification(msg) {
    this.messageServiceRef.add({
      severity: 'success',
      summary: 'Success',
      detail: msg,
    })
  }
}
