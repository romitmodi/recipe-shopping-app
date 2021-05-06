import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  name: string;
  editMode: boolean = false;

  recipeDetailForm: FormGroup;

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (param: Params) => {
          this.name = param['name'];
          this.editMode = param['name'] != null;
          this.initForm();
        }
      );
  }

  initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let imagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeByName(this.name);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      imagePath = recipe.imagePath;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'quantity': new FormControl(ingredient.quantity)
          }));
        }
      }
    }
    this.recipeDetailForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(imagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }

  getIngredientControls() {
    return (<FormArray>this.recipeDetailForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.recipeDetailForm.value);
    if (this.editMode) {
      this.editMode = false;
      this.route.navigate(['recipes', this.name]);
    }
  }

  onCancel() {
    this.editMode = false;
    this.route.navigate(['recipes', this.name]);
  }
}
