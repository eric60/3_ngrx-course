import {Inject, Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";

// recall write it down x3
// action => effect => service/api call => effect => state save in state
// this class should NOT be injected anywhere in your code -- it is purely handled by the ngrx library
@Injectable()
export class AuthEffects  {

  constructor(private $actions: Actions) {
  }

  // as a side effect, want to save user profile to backend in addition to saving in state
}
