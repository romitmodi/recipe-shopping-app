import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-delete',
  templateUrl: './recipe-delete.component.html',
  styleUrls: ['./recipe-delete.component.css']
})
export class RecipeDeleteComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    const index = +this.activatedRoute.params['id']
    this.recipeService.deleteRecipe(index);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }

}
