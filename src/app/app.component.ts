import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {AuthState} from "./auth/reducers";
import {GlobalAppState} from "./reducers";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;

    // use reactive observable instead of plain boolean
    isLoggedIn$: Observable<boolean>
    isLoggedOut$: Observable<boolean>

    constructor(private router: Router, private store: Store<GlobalAppState>) {
      // challenge yourself - try out on your own first!, show/hide login logout buttons based on store data

    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.store.subscribe(state => console.log("Store value: ", state))

      this.isLoggedIn$ = this.store.pipe(
        map(state => !!state["auth"].user) // true if exists
      )

      this.isLoggedOut$ = this.store.pipe(
        map(state => !state["auth"].user) // false if exists
      )

    }

    logout() {

    }

}
