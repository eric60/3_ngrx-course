// create mapping functions with memory easily with createSelector funciton

import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./reducers";

// feature selector = type safe selector
export const selectAuthState = createFeatureSelector <AuthState>("auth")

// min 2 arguments: 1st+ arguments: multiple mapping functions to select different parts of the store state, then a final argument: projector function gets all the slices of state from previous mapping functions and that gives us the final result of the isLoggedIn selector: boolean true/false

// ngrx feature selectors explained: the auth state is a feature state that corresponds to the auth feature module (screens, services, components of the auth functionality) included in the root module
export const isLoggedIn = createSelector(
  selectAuthState,
  // state => state["auth"], // no type safety so use feature selectors aka memoizedselectors with state
  state => state["courses"], // for example a second mapping function to get slice of courses data
    (auth, courses) => !!auth.user
)

// createSelector is a memoized function,
// MemoizedSelector (having memory of previous executions and only executes if inputs are different and keeps in memory the results of previous executions) has memory unlike plain select() method, so as long as INPUT globalappstate does not change, then the OUTPUT isLoggedIn is not recalculated

export const isLoggedOut = createSelector(
  isLoggedIn,
  isLoggedInVal => !isLoggedInVal
)
