import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { FarmerDetailsComponent } from "./pages/farmer-details/farmer-details.component";
import { LoginComponent } from "./pages/login/login.component";
const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: { showNavbar: false, headerText: "PALLIYAKAL QRCODE LIST" },
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent ,
    data: { showNavbar: false, headerText: "PALLIYAKAL QRCODE LIST" },
  },
  {
    path: "safetoeatkerala/:id",
    component: FarmerDetailsComponent ,
    data: { showNavbar: false, headerText: "PALLIYAKAL QRCODE LIST" },

  },
  {
    path: "qrCode/list",
    loadChildren: () =>
      import("./modules/qr-generator/qr-generator.module").then(
        (m) => m.QrGeneratorModule
      ),
    data: { showNavbar: true, headerText: "QRCODE GENERATOR" },
    canActivate: [AuthGuard],
  },
  {
    path: "",
    redirectTo: '/qrCode/list',
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: "",
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
