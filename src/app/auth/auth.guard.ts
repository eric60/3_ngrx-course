import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {GlobalAppState} from "../reducers";
import {select, Store} from "@ngrx/store";
import {isLoggedIn, selectAuthState} from "./auth.selectors";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
// Class-based Route guards are deprecated in favor of functional guards. An injectable class can be used as a functional guard using the inject function: canActivate: [() => inject(myGuard).canActivate()

  constructor(private store: Store<GlobalAppState>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(

      select(isLoggedIn),

      tap(loggedIn => { // side effect of redirect to login page while still returning Observable<boolean>
        if (!loggedIn) {
          this.router.navigateByUrl("/login")
        }
      }))
  }
}
