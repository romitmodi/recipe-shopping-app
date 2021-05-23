import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./component/auth.component";
import { AuthInterceptorService } from "./services/auth-intercepter.service";

@NgModule({
    declarations: [
        AuthComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ],
    exports: [
        AuthComponent
    ]
})
export class AuthModule { }