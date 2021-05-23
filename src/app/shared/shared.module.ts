import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertComponent } from "./component/alert/alert.component";
import { LoadingSpinnerComponent } from "./component/loading-spinner/loading-spinner.component";
import { DropDownDirective } from "./directive/dropdown.directive";
import { PlaceholderDirective } from "./directive/placeholder.directive";
import { DataStorageService } from "./services/data-storage.service";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropDownDirective
    ],
    providers: [
        DataStorageService
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropDownDirective,
        CommonModule
    ]
})
export class SharedModule { }