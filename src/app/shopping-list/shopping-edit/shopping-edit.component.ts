import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

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

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredents: Ingredient[] } }>) { }

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
    const ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.quantity)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIndex, ingredient);
      this.editMode = false;
    } else {
      //this.shoppingListService.addIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.ingredientForm.reset();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelettion() {
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
