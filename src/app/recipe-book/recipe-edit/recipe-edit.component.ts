import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {isSubscription} from "rxjs/internal/Subscription";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id?: number = undefined;
  editMode = false;
  recipeForm: FormGroup = new FormGroup({});
  private subscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.get('index') !== null) {
        this.id = parseInt(<string>paramMap.get('index'));
        this.editMode = true;
      } else {
        this.editMode = false;
        this.id = undefined;
      }

      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngredients = new FormArray<FormGroup>([]);

    if (this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id ? this.id : 0);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, [Validators.required,]),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(0)]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required,]),
      'imagePath': new FormControl(imagePath, [Validators.required,]),
      'description': new FormControl(description, [Validators.required,]),
      'ingredients': recipeIngredients,
    });
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients'));
  }

  onSubmit() {
    console.log(this.recipeForm.value);

    const recipe = new Recipe(
      this.recipeForm.get('name')?.value,
      this.recipeForm.get('description')?.value,
      this.recipeForm.get('imagePath')?.value,
      this.recipeForm.get('ingredients')?.value,
    );

    let redirectId = 0;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id ? this.id : 0, recipe);
      redirectId = this.id ? this.id : 0;
    } else {
      redirectId = this.recipeService.addRecipe(recipe);
    }

    console.log(this.recipeService.getRecipes());
    this.router.navigate(['recipe-book', redirectId],);
  }

  addRecipe() {
    this.controls.push(
      new FormGroup({
        'name': new FormControl('', [Validators.required,]),
        'amount': new FormControl('', [Validators.required, Validators.min(0)]),
      })
    );
  }

  delete() {
    if (this.editMode) {
      this.recipeService.removeRecipe(this.id ? this.id : 0);
      this.router.navigate(['recipe-book'],);
    } else {
      // noop
    }
  }

  cancel() {
    if (this.editMode) {
      this.router.navigate(['recipe-book', this.id ? this.id : 0],);
    } else {
      this.router.navigate(['recipe-book']);
    }
  }

  removeIngredient(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
