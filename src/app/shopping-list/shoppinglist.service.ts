import {Ingredient} from "../shared/model/ingredient.model";
import {Injectable} from "@angular/core";
import {Subject, tap} from "rxjs";
import {Recipe} from "../recipe-book/recipe.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ShoppinglistService {
  public ingredientsChangedSubject = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [];
  public startedEditing: Subject<number> = new Subject<number>();

  public constructor(
    private http: HttpClient
  ) {
  }

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChangedSubject.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    console.log(this.ingredients);
    for (let ingredient of ingredients.slice()) {
      let foundIngredient = this.ingredients.find(t => t.name == ingredient.name);
      if (foundIngredient) {
        foundIngredient.amount += ingredient.amount;
      } else {
        this.ingredients.push(ingredient);
      }
    }

    this.ingredientsChangedSubject.next(this.getIngredients());
  }

  removeIngredient(value: string) {
    this.ingredients = this.ingredients.filter(t => t.name !== value);
    this.ingredientsChangedSubject.next(this.getIngredients());
  }

  saveData() {
    this.http.put<Recipe[]>(
      "https://ng-complete-guide-404408-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
      this.ingredients
    ).subscribe(result => {
      console.log(result);
    });
  }

  fetchData() {
    return this.http.get<Ingredient[]>(
      "https://ng-complete-guide-404408-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
    )
      .pipe(
        tap((result: Ingredient[]) => {
          this.ingredients = result ?? [];
          this.ingredientsChangedSubject.next(this.getIngredients());
        })
      );
  }
}
