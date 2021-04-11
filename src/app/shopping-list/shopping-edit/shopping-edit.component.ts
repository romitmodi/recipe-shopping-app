import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared-model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingredientName') ingredientName: ElementRef;
  @ViewChild('ingredientQuantity') ingredientQuantity: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void { }

  onAddIngredient(): void {
    this.shoppingListService.addIngredient(
      new Ingredient(this.ingredientName.nativeElement.value, this.ingredientQuantity.nativeElement.value)
    );
  }
}
