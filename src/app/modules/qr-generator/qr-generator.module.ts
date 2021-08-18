import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {TooltipModule} from "primeng/tooltip";
import { QrGeneratorRoutingModule } from "./qr-generator-routing.module";
import { QrCodeComponent } from "./pages/qr-code/qr-code.component";
import { AvatarModule } from "primeng/avatar";
import { TableModule } from "primeng/table";
import { QRCodeModule } from "angularx-qrcode";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from "primeng/api";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [QrCodeComponent],
  imports: [
    CommonModule,
    QrGeneratorRoutingModule,
    AvatarModule,
    QRCodeModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,NgxUiLoaderModule
  ],
  providers:[ConfirmationService,MessageService]
})
export class QrGeneratorModule {}
