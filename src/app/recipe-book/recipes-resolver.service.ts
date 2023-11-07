import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";
import {ShoppinglistService} from "../shopping-list/shoppinglist.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private recipeService: RecipeService
  ) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    if (this.recipeService.getRecipes().length === 0)
    {
      return this.recipeService.fetchData();
    }

    return this.recipeService.getRecipes();
  }

}
