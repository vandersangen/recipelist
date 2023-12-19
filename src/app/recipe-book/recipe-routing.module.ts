import {Route, RouterModule} from "@angular/router";
import {RecipeBookComponent} from "./recipe-book.component";
import {DetailComponent as RecipeBookDetailComponent} from "./detail/detail.component";
import {NgModule} from "@angular/core";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./recipes-resolver.service";
import {AuthGuard} from "../auth/auth.guard";
import {ShoppinglistResolverService} from "../shopping-list/shoppinglist-resolver.service";

const routes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: RecipeBookComponent,
    resolve: [RecipesResolverService, ShoppinglistResolverService],
    children: [
      {path: 'add', component: RecipeEditComponent},
      {path: ':index/edit', component: RecipeEditComponent},
      {path: ':index', component: RecipeBookDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class RecipeRoutingModule {

}
