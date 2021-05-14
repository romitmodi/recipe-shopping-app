import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    @ViewChild('form') authForm: NgForm;

    isLoginMode = true;
    isLoading = false;
    error = null;

    constructor(private authService: AuthService) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        const email = this.authForm.value['email'];
        const password = this.authForm.value['password'];
        this.isLoading = true;
        if (this.isLoginMode) {
            this.authObservableHandler(this.authService.userLoginRequest(email, password));
        } else {
            this.authObservableHandler(this.authService.onUserSignUp(email, password))
        }
        this.authForm.reset();
    }

    authObservableHandler(authObservable: Observable<AuthResponseData>) {
        authObservable.subscribe(
            authResponseData => {
                console.log(authResponseData);
                this.isLoading = false;
            },
            error => {
                console.log(error);
                this.error = error;
                this.isLoading = false;
            });
    }
}