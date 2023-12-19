import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {ShoppingListRoutingModule} from "./shopping-list-routing.module";
import {ShoppingListComponent} from "./shopping-list.component";
import {EditComponent} from "./edit/edit.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    EditComponent,
    // DropdownDirective
  ],
  imports: [
    // BrowserModule replacement,
    SharedModule,
    ShoppingListRoutingModule,
  ],
})
export class ShoppingListModule {
}
