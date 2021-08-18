import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FarmerDetailsComponent } from "../../pages/farmer-details/farmer-details.component";
import { QrCodeComponent } from "./pages/qr-code/qr-code.component";

const routes: Routes = [
  {
    path: "",
    component: QrCodeComponent,
  },
  {
    path: "/:id",
    component: FarmerDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrGeneratorRoutingModule {}
