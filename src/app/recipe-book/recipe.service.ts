import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {exhaustMap, map, Subject, take, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {UserModel} from "../auth/user.model";

@Injectable()
export class RecipeService {
  public recipeListUpdated = new Subject();
  private recipes: Recipe[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
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
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: UserModel | null) => {
        return this.http.put<Recipe[]>(
          "https://ng-complete-guide-404408-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?",
          this.recipes,
          {
            params: new HttpParams().set('auth', user ? user.token.toString() : '')
          }
        );
      })).subscribe(result => {
      }
    )
  }

  fetchData() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: UserModel | null) => {
          return this.http.get<Recipe[]>(
            "https://ng-complete-guide-404408-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
            {
              params: new HttpParams().set('auth', user ? user.token.toString() : '')
            }
          )
        }
      ),
      map(result => {
        return result.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          }
        });
      }),
      tap((result: Recipe[]) => {
        this.recipes = result;
        this.recipeListUpdated.next(true);
      }),
    );
  }
}
