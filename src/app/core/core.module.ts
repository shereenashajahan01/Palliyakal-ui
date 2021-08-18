import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";

// Material Modules

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderComponent } from "./components/loader/loader.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";

import { NotificationListComponent } from "./components/notification/notification.component";
import { NotificationService } from "./services/notification.service";
import { HttpErrorInterceptor } from "./interceptors/http-error-interceptor";
import { LoaderService } from "./services/loader.service";
import { SessionStorageService } from "./services/session-storage.service";
import { ImpactItemComponent } from "./components/impact-item/impact-item.component";
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import {ToastModule} from 'primeng/toast';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    LoaderComponent,
    NotificationListComponent,
    ImpactItemComponent,
    MainHeaderComponent,
    LayoutHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    LoaderComponent,
    NotificationListComponent,
    ImpactItemComponent,
    MainHeaderComponent,
    LayoutHeaderComponent
  ],
  providers: [
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [NotificationService, LoaderService, SessionStorageService],
    },
  ],
})
export class CoreModule {}
