import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "../../core/core.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreModule, HttpClientModule],
  exports: [],
})
export class SharedModule {}
