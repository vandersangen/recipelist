import {NgModule} from '@angular/core';

import {DetailComponent as RecipeBookDetailComponent} from './detail/detail.component';
import {OverviewComponent as RecipeBookOverViewComponent} from "./overview/overview.component";
import {RecipeBookComponent} from "./recipe-book.component";

import {ItemComponent} from "./overview/item/item.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeRoutingModule} from "./recipe-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeBookDetailComponent,
    RecipeBookOverViewComponent,
    ItemComponent,
    RecipeEditComponent,
  ],
  imports: [
    SharedModule,
    RecipeRoutingModule,
  ],
})
export class RecipesModule {
}
