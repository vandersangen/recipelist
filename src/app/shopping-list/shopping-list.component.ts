import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/model/ingredient.model";
import {ShoppinglistService} from "./shoppinglist.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscription?: Subscription = undefined;
  ingredients: Ingredient[] = [];

  constructor(
    private shoppingListService: ShoppinglistService
  ) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.subscription = this.shoppingListService.ingredientsChangedSubject
      .subscribe((ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : null;
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
