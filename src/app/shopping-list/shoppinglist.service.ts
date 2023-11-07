import {Ingredient} from "../shared/model/ingredient.model";
import {EventEmitter} from "@angular/core";
import {Subject, Subscription} from "rxjs";

export class ShoppinglistService {
  public ingredientsChangedSubject = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Rice', 1000),
    new Ingredient('Apples', 6),
    new Ingredient('Tomatoes', 6),
  ];

  public startedEditing: Subject<number> = new Subject<number>();

  public constructor() {
  }

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChangedSubject.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChangedSubject.next(this.getIngredients());
  }

  removeIngredient(value: string) {
    this.ingredients = this.ingredients.filter(t => t.name !== value);
    this.ingredientsChangedSubject.next(this.getIngredients());
  }
}
