import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../auth/auth.guard";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppinglistResolverService} from "./shoppinglist-resolver.service";
import {RecipesResolverService} from "../recipe-book/recipes-resolver.service";

const routes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ShoppingListComponent,
    resolve: [ShoppinglistResolverService, RecipesResolverService],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {

}
