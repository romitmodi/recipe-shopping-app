import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail: Recipe;
  index: number;

  constructor(private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.index = +param['id'];
        this.recipeDetail = this.recipeService.getRecipeByIndex(this.index);
      }
    );
  }

  addIngredientsToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.route.navigate(['recipes']);
  }

}
