import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared-model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm') ingredientForm: NgForm;

  subscription: Subscription;
  editMode: boolean = false;
  editedIndex: number;
  editIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientSelected
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedIndex = index;
        this.editIngredient = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.editIngredient.name,
          quantity: this.editIngredient.quantity
        });
      }
      );
  }

  onAddIngredientAsInput(form: NgForm): void {
    console.log(form);
    this.shoppingListService.addIngredient(
      new Ingredient(form.value.name, form.value.quantity)
    );
  }

  onAddIngredient(): void {
    console.log(this.editMode);
    const ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.quantity)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIndex, ingredient);
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.ingredientForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
