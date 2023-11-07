import {Route, Router, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {RecipeBookComponent} from "./recipe-book/recipe-book.component";
import {DetailComponent as RecipeBookDetailComponent} from "./recipe-book/detail/detail.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {EditComponent as ShoppingListEditComponent} from "./shopping-list/edit/edit.component";
import {NgModule} from "@angular/core";
import {RecipeEditComponent} from "./recipe-book/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./recipe-book/recipes-resolver.service";


const routes: Route[] = [
  {path: '', redirectTo: 'recipe-book', pathMatch: 'full'},
  {
    path: 'recipe-book',
    component: RecipeBookComponent,
    children: [
      {path: 'add', component: RecipeEditComponent},
      {path: ':index/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
      {path: ':index', component: RecipeBookDetailComponent, resolve: [RecipesResolverService]}
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    children: [
      {
        path: ':name/edit',
        component: ShoppingListEditComponent
      }
    ]
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
