import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoute: Route[] = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'shoppingList', component: ShoppingListComponent },
    { path: 'auth', component: AuthComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }