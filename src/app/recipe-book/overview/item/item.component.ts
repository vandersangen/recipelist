import {Component, Input} from '@angular/core';
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'recipe-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() recipe: Recipe = new Recipe('', '', '', []);
  @Input() index: number = 0;
}
