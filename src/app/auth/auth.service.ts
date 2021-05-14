import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

interface AuthResponseData {
    idToken: string,
    emaild: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private authKey = 'AIzaSyA43wOLGsexRwOfb5xrgjGb3sgKmIIpmME';

    constructor(private httpClient: HttpClient) { }

    onUserSignUp(email: string, password: string): Observable<AuthResponseData> {
        return this.httpClient
            .post<AuthResponseData>(
                environment.authSignUpUrl + this.authKey,
                {
                    'email': email,
                    'password': password,
                    'returnSecureToken': true
                }
            ).pipe(catchError(errorResponse => {
                console.log(errorResponse);
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
                    }
                }
                return throwError(errorMessage);
            }));
    }

    userLoginRequest(email: string, password: string) {
        return this.httpClient;
    }

}