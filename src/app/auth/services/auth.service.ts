import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../model/user.model";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private authKey = 'AIzaSyA43wOLGsexRwOfb5xrgjGb3sgKmIIpmME';
    private tokenExpirationTimer: any;

    user = new BehaviorSubject<User>(null);

    constructor(private httpClient: HttpClient,
        private router: Router) { }

    signUp(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(
            environment.authSignUpUrl + this.authKey,
            {
                'email': email,
                'password': password,
                'returnSecureToken': true
            }
        ).pipe(catchError(this.handleError), tap(data => this.handleAuthentication(data)));
    }

    login(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(
            environment.authLoginUrl + this.authKey,
            {
                'email': email,
                'password': password,
                'returnSecureToken': true
            }
        ).pipe(catchError(this.handleError), tap(data => this.handleAuthentication(data)));
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }
        const user = new User(userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate));

        if (user.token) {
            this.user.next(user);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(tokenExpirationDate: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, tokenExpirationDate);
    }

    private handleAuthentication(responseData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
        const user = new User(responseData.email,
            responseData.localId,
            responseData.idToken,
            expirationDate);
        this.user.next(user);
        this.autoLogout(+responseData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error has occured';
        if (errorResponse.error && errorResponse.error.error) {
            switch (errorResponse.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email is already registered!';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'You are not allowed to perform this operation!';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = 'Multiple invalid attempt has been done in short span of time. Please retry later.';
                    break;
                case 'INVALID_PASSWORD':
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Email or password is incorrect.';
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'User is disabled by Adminstrator. Please check with support.';
                    break;
            }
        }
        return throwError(errorMessage);
    }

}