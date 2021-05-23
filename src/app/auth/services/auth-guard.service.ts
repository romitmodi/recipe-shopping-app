import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
        routeStateSnapshot: RouterStateSnapshot): boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            map(user => {
                if (!!user) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            }),
            // tap(isAuthenticated => {
            //     if (isAuthenticated) {
            //         return true;
            //     }
            //     return this.router.createUrlTree(['/auth']);
            // })
        );
    }
}