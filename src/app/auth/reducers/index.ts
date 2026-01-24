import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import {User} from "../model/user.model";
import {AuthActions} from "../action-types";

export const authFeatureKey = 'auth';

/* not AppGlobalState, so just AuthState
{
auth: {}
}
 */
export interface AuthState {
  user: User
}

export const initialAuthState: AuthState = {
  user: undefined
}

/*
// reducer is just a plain js function pass to the store so that the store knows **how to react to a given action**

input: action that was just dispatched to the sto
output: return new state of store, does NOT modify the state of store directly, calculates new version of the state based on the previous state the action that just got dispatched

 */
// function authReducer(state, action): AuthState {
// }


// [Step-by-Step] Step 3: Requirement: In response to a login action, the reducer should save the user profile in state
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginAction, (state, action) => {
    // output on loginAction = what is the new value of the state?

    // console.log("calling login authReducer")
    // debugger;

    return {
      user: action.user // return plain js object of the new VERSION of the state
    }
  })
)

/* reducer comes from reduce function, which is a higher order function that takes in another function as input

array.reduce((accumulator, currentValue, index, array) => {
  return newAccumulator;
}, initialValue);

	•	accumulator aka prevValue → result so far
	•	currentValue → current array item
	•	initialValue → starting value (important!)
 */
const nums = [1, 2, 3, 4];
const sum = nums.reduce((total, n, currIndexRef, currArrayRef) => total + n, 0);
