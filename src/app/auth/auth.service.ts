import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
    idToken: string,
    emaild: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private authKey = 'AIzaSyA43wOLGsexRwOfb5xrgjGb3sgKmIIpmME';

    constructor(private httpClient: HttpClient) { }

    onUserSignUp(email: string, password: string): Observable<AuthResponseData> {
        return this.authObservableHandler(
            this.httpClient.post<AuthResponseData>(
                environment.authSignUpUrl + this.authKey,
                {
                    'email': email,
                    'password': password,
                    'returnSecureToken': true
                }
            )
        );
    }

    userLoginRequest(email: string, password: string): Observable<AuthResponseData> {
        return this.authObservableHandler(
            this.httpClient.post<AuthResponseData>(
                environment.authLoginUrl + this.authKey,
                {
                    'email': email,
                    'password': password,
                    'returnSecureToken': true
                }
            )
        );
    }

    private authObservableHandler(authObservable: Observable<AuthResponseData>): Observable<AuthResponseData> {
        return authObservable.pipe(
            catchError(errorResponse => {
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
            })
        );
    }

}