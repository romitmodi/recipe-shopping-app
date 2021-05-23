import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/component/auth.component";

const appRoute: Route[] = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }