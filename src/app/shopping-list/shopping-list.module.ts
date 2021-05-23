import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListService } from "./shopping-list.service";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    providers: [
        ShoppingListService,
    ],
    imports: [
        SharedModule,
        FormsModule,
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule { }