import {Ingredient} from "../shared/model/ingredient.model";

export class Recipe {
  public id?: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
