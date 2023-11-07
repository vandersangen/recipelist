import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";
import {isSubscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'recipe-list-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.subscription = this.recipeService.recipeListUpdated.subscribe(t => {
      this.recipes = this.recipeService.getRecipes();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
