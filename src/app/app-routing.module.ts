import {PreloadAllModules, Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";


const routes: Route[] = [
  {path: '', redirectTo: 'recipe-book', pathMatch: 'full',},
  {
    path: 'recipe-book',
    loadChildren: () => {
      return import('./recipe-book/recipes.module').then(m => m.RecipesModule);
    }
  },
  {
    path: 'shopping-list',
    loadChildren: () => {
      return import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule);
    }
  },
  {
    path: 'auth',
    loadChildren: () => {
      return import('./auth/auth.module').then(m => m.AuthModule);
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        // Download lazy-loaded modules after initial download
        // Useful for (very) slow internet connections
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
