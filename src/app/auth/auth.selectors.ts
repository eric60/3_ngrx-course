// create mapping functions with memory easily with createSelector funciton

import {createSelector} from "@ngrx/store";

// min 2 arguments: 1st+ arguments: multiple mapping functions to select different parts of the store state, then a final argument: projector function gets all the slices of state from previous mapping functions and that gives us the final result of the isLoggedIn selector: boolean true/false
export const isLoggedIn = createSelector(
  state => state["auth"],
  state => state["courses"], // for example,
    (auth, courses) => !!auth.user
)
// createSelector is a memoized function, MemoizedSelector (having memory of previous executions and only executes if inputs are different and keeps in memory the results of previous executions) has memory unlike plain select() method, so as long as INPUT globalappstate does not change, then the OUTPUT isLoggedIn is not recalculated

export const isLoggedOut = createSelector(
  isLoggedIn,
  isLoggedInVal => !isLoggedInVal
)
