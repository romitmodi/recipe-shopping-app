import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelectedEvent= new EventEmitter<Recipe>();

  recipes:Array<Recipe>=[
    new Recipe('Samosa','Indian Traditional Dish','https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg'),
    new Recipe('Chole','Indian Traditional Dish','https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg')
  ];

  constructor() { }

  ngOnInit(): void { }

  onRecipeSelected(recipe:Recipe){
    this.recipeSelectedEvent.emit(recipe);
  }

}
