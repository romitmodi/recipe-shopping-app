import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoute: Route[] = [
    { path: '', component: RecipesComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'shoppingList', component: ShoppingListComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }