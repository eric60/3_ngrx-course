import {Inject, Injectable} from "@angular/core";
import {act, Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthActions} from "./action-types";
import {tap} from "rxjs/operators";

// lesson 19: understanding ngrx effects - a simple example
// recall write it down x3
// action => effect => service/api call => new action => reducer save in store
// effect = something extra we want to do e.g. save to backend after an action has been dispatched and the reducers have updated the store
// this class should NOT be injected anywhere in your code -- it is purely handled by the ngrx library
@Injectable()
// Q: angular is injectable singleton?
// A: Yes, In Angular, a service is a singleton by default within the scope of its provider. If a service is provided at the root level of the application, there will only be one instance of that service for the entire application's lifecycle, and it is made available through Angular's dependency injection (DI) system
// Hierarchical Injectors: Angular uses a hierarchical injection system. While providedIn: 'root' creates a single instance for the entire app, you CAN provide a service at the component or module level to create a NEW instance SPECIFIC to that injector and its children. .
export class AuthEffects {

// new way #3 is using createEffect
  login$ = createEffect(() => {
    return this.$actions
      .pipe(
        ofType(AuthActions.loginAction), // filtering for just loginAction
        tap(action => {
          localStorage.setItem('user', JSON.stringify(action.user)); // type safe can access action.user object instead of action['user']
        })
      );
  }, {dispatch: false}) // very important to have config dispatch = false else create infinite loop since saving storage would dispatch new action that would then trigger this effect ofType loginAction and save to storage and over and over again
  // pros of createEffect: angular will re-create the login$ if any issues, and don't need to manually subscribe -- it is automatically registered to respond on loginActions

  constructor(private $actions: Actions) {

    // new way #2 is to create a new observable that emits ONLY login actions
    /*const login$ =  this.$actions
      .pipe(
        ofType(AuthActions.loginAction),
        tap(action => {
          localStorage.setItem('user', JSON.stringify(action.user)) // type safe so can access action.user
        })
      )*/

    // subscribe or else nothing will happen
    // login$.subscribe() // can remove manual subscription with createEffect(())

    /*
     old way #1 to manually subscribe and filter
     // there can be 10+ actions to handle for the effect
     $actions.subscribe(action => {
       if (action.type == '[Login Page] User Login') {
           localStorage.setItem('user', JSON.stringify(action['user']))
           // not type safe so using brackets
           // user profile will survive browser refreshes
         console.log("in effect from user login - saved user to storage")
       }
     })*/
  }

  // as a side effect, want to save user profile to backend in addition to saving in state
}
