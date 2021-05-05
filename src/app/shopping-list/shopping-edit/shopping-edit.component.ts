import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared-model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingredientForm') ingredientForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void { }

  onAddIngredientAsInput(form: NgForm): void {
    console.log(form);
    this.shoppingListService.addIngredient(
      new Ingredient(form.value.name, form.value.quantity)
    );
  }

  onAddIngredient(): void {
    console.log(this.ingredientForm);
    const ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.quantity)
    this.shoppingListService.addIngredient(ingredient);
  }
}
