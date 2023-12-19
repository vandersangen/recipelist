import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './navigation/header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    // AuthModule => lazyloaded,
    // RecipesModule => lazyloaded,
    // ShoppingListModule => lazyloaded,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
