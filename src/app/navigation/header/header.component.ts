import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {RecipeService} from "../../recipe-book/recipe.service";
import {ShoppinglistService} from "../../shopping-list/shoppinglist.service";
import {AuthService} from "../../auth/auth.service";
import {UserModel} from "../../auth/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() clickedEmitter = new EventEmitter<string>
  private subscription = new Subscription();
  public isAuthenticated: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppinglistService,
    private authService: AuthService
  ) {
  }

  elementClicked(element: HTMLAnchorElement) {
    this.clickedEmitter.emit(element.innerText);
  }

  saveData() {
    this.recipeService.saveData();
    this.shoppingListService.saveData();
  }

  fetchData() {
    this.recipeService.fetchData().subscribe();
    this.shoppingListService.fetchData().subscribe();
  }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((user: UserModel|null) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
