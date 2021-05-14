import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
            );
    }

    userLoginRequest(email: string, password: string) {
        return this.httpClient;
    }

}