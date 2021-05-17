import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
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

    constructor(private authService: AuthService,
        private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        const email = this.authForm.value['email'];
        const password = this.authForm.value['password'];
        this.isLoading = true;
        if (this.isLoginMode) {
            this.authObservableHandler(this.authService.login(email, password));
        } else {
            this.authObservableHandler(this.authService.signUp(email, password))
        }
        this.authForm.reset();
    }

    authObservableHandler(authObservable: Observable<AuthResponseData>) {
        authObservable.subscribe(
            authResponseData => {
                this.isLoading = false;
                this.router.navigate(['recipes']);
            },
            error => {
                console.log(error);
                this.error = error;
                this.isLoading = false;
            }
        );
    }

    onAlertCloseEvent() {
        this.error = null;
    }
}