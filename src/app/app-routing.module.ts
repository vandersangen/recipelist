import {Route, Router, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {RecipeBookComponent} from "./recipe-book/recipe-book.component";
import {DetailComponent as RecipeBookDetailComponent} from "./recipe-book/detail/detail.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {EditComponent as ShoppingListEditComponent} from "./shopping-list/edit/edit.component";
import {NgModule} from "@angular/core";
import {RecipeEditComponent} from "./recipe-book/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./recipe-book/recipes-resolver.service";
import {ShoppinglistResolverService} from "./shopping-list/shoppinglist-resolver.service";
import {ShoppinglistService} from "./shopping-list/shoppinglist.service";


const routes: Route[] = [
  {path: '', redirectTo: 'recipe-book', pathMatch: 'full'},
  {
    path: 'recipe-book',
    component: RecipeBookComponent,
    children: [
      {path: 'add', component: RecipeEditComponent},
      {path: ':index/edit', component: RecipeEditComponent, resolve: [RecipesResolverService, ShoppinglistResolverService]},
      {path: ':index', component: RecipeBookDetailComponent, resolve: [RecipesResolverService, ShoppinglistResolverService]}
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    resolve: [ShoppinglistResolverService, RecipesResolverService],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
