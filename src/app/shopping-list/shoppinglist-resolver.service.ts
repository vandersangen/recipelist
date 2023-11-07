import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ShoppinglistService} from "../shopping-list/shoppinglist.service";
import {Ingredient} from "../shared/model/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppinglistResolverService implements Resolve<Ingredient[]> {

  constructor(
    private shoppingListService: ShoppinglistService
  ) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Ingredient[]> | Promise<Ingredient[]> | Ingredient[] {
    if (this.shoppingListService.getIngredients().length === 0)
    {
      return this.shoppingListService.fetchData();
    }

    return this.shoppingListService.getIngredients();
  }

}
