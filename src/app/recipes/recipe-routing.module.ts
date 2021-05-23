import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/services/auth-guard.service";
import { RecipeDeleteComponent } from "./recipe-delete/recipe-delete.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const route: Routes = [
    {
        path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] },
            { path: ':id/delete', component: RecipeDeleteComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})
export class RecipeRoutingModule { }