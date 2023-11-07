import {Component, EventEmitter, Output} from '@angular/core';
import {RecipeService} from "../../recipe-book/recipe.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() clickedEmitter = new EventEmitter<string>

  constructor(
    private recipeService: RecipeService
  ) {
  }

  elementClicked(element: HTMLAnchorElement) {
    this.clickedEmitter.emit(element.innerText);
  }

  saveData() {
    this.recipeService.saveData();
  }

  fetchData() {
    this.recipeService.fetchData().subscribe();
  }
}
