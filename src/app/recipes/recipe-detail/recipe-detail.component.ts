import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
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
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const name = this.activatedRoute.snapshot.params['name'];
    this.recipeDetail = this.recipeService.getRecipeByName(name);
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.recipeDetail = this.recipeService.getRecipeByName(param['name']);
      }
    );
  }

  addIngredientsToShoppingList(): void {
    this.shoppingListService.addIngredients(this.recipeDetail.ingredients);
  }

}
