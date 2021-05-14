import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

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
            this.onLogin(email, password);
        } else {
            this.onSignup(email, password);
        }
        this.authForm.reset();
    }

    onSignup(email: string, password: string) {
        this.authService.onUserSignUp(email, password).subscribe(
            authResponseData => {
                console.log(authResponseData);
                this.isLoading = false;
            },
            error => {
                console.log(error);
                this.error = 'An error is occured!!' + error.message;
                this.isLoading = false;
            });
    }

    onLogin(email: string, password: string) {
        this.authService.userLoginRequest(email, password);
    }
}