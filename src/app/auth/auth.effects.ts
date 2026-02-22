import {Inject, Injectable} from "@angular/core";
import {act, Actions} from "@ngrx/effects";

// lesson 19: understanding ngrx effects - a simple example
// recall write it down x3
// action => effect => service/api call => new action => reducer save in store
// effect = something extra we want to do e.g. save to backend after an action has been dispatched and the reducers have updated the store
// this class should NOT be injected anywhere in your code -- it is purely handled by the ngrx library
@Injectable()
export class AuthEffects  {

  constructor(private $actions: Actions) {
    // there can be 10+ actions to handle for the effect
    $actions.subscribe(action => {
      if (action.type == '[Login Page] User Login') {
          localStorage.setItem('user', JSON.stringify(action['user'])) // user profile will survive browser refreshes
        console.log("in effect from user login - saved user to storage")
      }
    })
  }

  // as a side effect, want to save user profile to backend in addition to saving in state
}
