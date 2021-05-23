import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

const appRoute: Route[] = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }