import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/model/ingredient.model";
import {ShoppinglistService} from "../shoppinglist.service";
import {RecipeService} from "../../recipe-book/recipe.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'shopping-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('ngForm') ngForm?: NgForm = undefined;

  private subscription: Subscription = new Subscription();

  private editMode = false;
  private editItemIndex?: number;
  private editedItem?: Ingredient;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppinglistService,
  ) {
  }

  addToShoppingList() {
    if (!this.ngForm) {
      return;
    }

    let form = this.ngForm.form;
    let ingredient = this.shoppingListService.getIngredients().find(t => t.name === form.get('name')?.value);
    if (!ingredient) {
      this.shoppingListService.addIngredient(
        new Ingredient(
          form.get('name')?.value,
          form.get('amount')?.value
        )
      );
    } else {
      ingredient.amount = form.get('amount')?.value;
    }

    this.editedItem = undefined;
    this.editItemIndex = undefined
    this.editMode = false;
    this.ngForm.reset();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredients()[index];

      if (!this.ngForm) {
        return;
      }

      this.ngForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  deleteItem() {
    if (!this.ngForm) {
      return;
    }

    let form = this.ngForm.form;
    this.shoppingListService.removeIngredient(form.get('name')?.value);
    this.ngForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
