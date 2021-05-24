import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

const appRoute: Route[] = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: 'shoppingList', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }