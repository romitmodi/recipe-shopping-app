import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail: Recipe;

  constructor(private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRouteSnapshot) { }

  ngOnInit(): void {
    const name = this.activatedRoute.params['name'];
    this.recipeDetail = this.recipeService.getRecipeByName(name);
  }

  addIngredientsToShoppingList(): void {
    this.shoppingListService.addIngredients(this.recipeDetail.ingredients);
  }

}
