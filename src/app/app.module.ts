import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './navigation/header/header.component';

import {DetailComponent as RecipeBookDetailComponent} from './recipe-book/detail/detail.component';
import {OverviewComponent as RecipeBookOverViewComponent} from "./recipe-book/overview/overview.component";

import {EditComponent as ShoppingListEditComponent} from "./shopping-list/edit/edit.component";
import {RecipeBookComponent} from './recipe-book/recipe-book.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ItemComponent} from './recipe-book/overview/item/item.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {RecipeService} from "./recipe-book/recipe.service";
import {ShoppinglistService} from "./shopping-list/shoppinglist.service";
import {AppRoutingModule} from "./app-routing.module";
import {RecipeEditComponent} from './recipe-book/recipe-edit/recipe-edit.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./auth/auth.component";
import {LoadingSpinnerComponent} from "./shared/loading-spinner.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {AlertComponent} from './shared/alert/alert.component';
import {PlaceholderDirective} from "./shared/placeholder/placeholder.directive";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AuthComponent,
    AppComponent,
    HeaderComponent,
    RecipeBookComponent,
    RecipeBookDetailComponent,
    RecipeBookOverViewComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    ItemComponent,
    DropdownDirective,
    RecipeEditComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    RecipeService,
    ShoppinglistService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
