import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared-model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Array<Ingredient>=[
    new Ingredient('Apple',5),
    new Ingredient('Tomatos', 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAddition(ingredent:Ingredient): void{
    this.ingredients.push(ingredent);
  }

}
