import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {map, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RecipeService {
  public recipeListUpdated = new Subject();
  private recipes: Recipe[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe): number {
    let id = this.recipes.push(recipe);
    this.recipeListUpdated.next(true);
    return id;
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeListUpdated.next(true);
  }

  removeRecipe(number: number) {
    delete this.recipes[number];
    this.recipeListUpdated.next(true);
  }

  saveData() {
    this.http.put<Recipe[]>(
      "https://ng-complete-guide-404408-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
      this.recipes
    ).subscribe(result => {
      console.log(result);
    });
  }

  fetchData() {
    return this.http.get<Recipe[]>(
      "https://ng-complete-guide-404408-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
    )
      .pipe(
        map(result => {
          return result.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients? recipe.ingredients: [],
            }
          });
        }),
        tap((result: Recipe[]) => {
          this.recipes = result;
          this.recipeListUpdated.next(true);
        })
      );
  }
}
