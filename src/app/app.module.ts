import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./pages/login/login.component";
import { LoginComponent as LoginInnerComponent } from "./components/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "./core/core.module";
// Material Modules
// Material Modules

import { FlexLayoutModule } from "@angular/flex-layout";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import {DialogModule} from 'primeng/dialog';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {ToastModule} from 'primeng/toast';
import { MessageService } from "primeng/api";
import { FarmerDetailsComponent } from './pages/farmer-details/farmer-details.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginInnerComponent,
    ResetPasswordComponent,
    FarmerDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CheckboxModule,
    CoreModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    FlexLayoutModule,
    ProgressSpinnerModule,
    NgxUiLoaderModule

  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
