import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppinglistService} from "../../shopping-list/shoppinglist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'recipe-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  selectedRecipe?: Recipe = undefined;
  selectedIndex?: number = undefined

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppinglistService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  addIngredientsToShoppingList(selectedRecipe: Recipe | undefined) {
    if (selectedRecipe === undefined) {
      return;
    }

    this.shoppingListService.addIngredients(selectedRecipe.ingredients)
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.get('index') !== null) {
        this.selectedIndex = parseInt(<string>paramMap.get('index'));
        this.selectedRecipe = this.recipeService.getRecipe(this.selectedIndex);
      }
    });
  }

  delete(selectedIndex: number) {
    this.recipeService.removeRecipe(selectedIndex);
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});

  }
}
