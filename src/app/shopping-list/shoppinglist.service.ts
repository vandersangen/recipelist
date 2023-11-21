import {Ingredient} from "../shared/model/ingredient.model";
import {Injectable} from "@angular/core";
import {exhaustMap, map, Subject, take, tap} from "rxjs";
import {Recipe} from "../recipe-book/recipe.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {UserModel} from "../auth/user.model";

@Injectable()
export class ShoppinglistService {
  public ingredientsChangedSubject = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [];
  public startedEditing: Subject<number> = new Subject<number>();

  public constructor(
    private http: HttpClient,
    private authService: AuthService
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
    return this.http.put<Recipe[]>(
      "https://ng-complete-guide-404408-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json?",
      this.ingredients,
    ).subscribe(result => {
    });
  }

  fetchData() {
    return this.http.get<Ingredient[]>(
      "https://ng-complete-guide-404408-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
    ).pipe(
      tap((result: Ingredient[]) => {
        this.ingredients = result ?? [];
        this.ingredientsChangedSubject.next(this.getIngredients());
      })
    )
  }
}
