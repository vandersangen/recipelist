import {NgModule} from '@angular/core';
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core.module";

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    SharedModule,
    CoreModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {
}
