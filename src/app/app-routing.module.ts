import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

const appRoute: Route[] = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipeModule) },
    { path: 'shoppingList', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }