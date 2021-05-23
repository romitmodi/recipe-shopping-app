import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/component/alert/alert.component";
import { PlaceholderDirective } from "../shared/directive/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

    @ViewChild('form') authForm: NgForm;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    private alertSubscription: Subscription;

    isLoginMode = true;
    isLoading = false;
    error = null;

    constructor(private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver) { }

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
                // this.error = error;
                this.createDynamicAlert(error);
                this.isLoading = false;
            }
        );
    }

    onAlertCloseEvent() {
        this.error = null;
    }

    ngOnDestroy(): void {
        if (this.alertSubscription) {
            this.alertSubscription.unsubscribe();
        }
    }

    private createDynamicAlert(errorMessage: string) {
        const alertComponentFactory: ComponentFactory<AlertComponent> = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        this.alertHost.viewContainerRef.clear();
        const componentRef = this.alertHost.viewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = errorMessage;
        this.alertSubscription = componentRef.instance.closeEvent.subscribe(() => {
            this.alertSubscription.unsubscribe();
            this.alertHost.viewContainerRef.clear();
        });
    }
}