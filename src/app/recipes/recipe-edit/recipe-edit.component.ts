import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  index: number;
  editMode: boolean = false;
  recipeDetailForm: FormGroup;

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (param: Params) => {
          this.index = +param['id'];
          this.editMode = param['id'] != null;
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
      const recipe = this.recipeService.getRecipeByIndex(this.index);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      imagePath = recipe.imagePath;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.setIngredient(ingredient.name, ingredient.quantity)
          );
        }
      }
    }
    this.recipeDetailForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  getIngredientControls() {
    return (<FormArray>this.recipeDetailForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeDetailForm.get('ingredients'))
      .push(
        this.setIngredient(null, null)
      );
  }

  private setIngredient(name: string, quantity: number): FormGroup {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'quantity': new FormControl(quantity, [
        Validators.required,
        Validators.pattern(/^[1-9][0-9]*$/)
      ])
    })
  }

  onSubmit() {
    console.log(this.recipeDetailForm.value);
    if (this.editMode) {
      this.editMode = false;
      this.recipeService.updateRecipe(this.index, this.recipeDetailForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeDetailForm.value);
    }
    this.route.navigate(['recipes', this.index]);
  }

  onCancel() {
    if (this.editMode) {
      this.editMode = false;
      this.route.navigate(['recipes', this.index]);
    } else {
      this.route.navigate(['recipes']);
    }
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeDetailForm.get('ingredients')).removeAt(index);
  }
}
