import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {DropdownDirective} from "./dropdown.directive";
import {AlertComponent} from "./alert/alert.component";
import {LoadingSpinnerComponent} from "./loading-spinner.component";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SharedModule {
}
