// https://github.com/angular-university/ngrx-course/blob/master/src/app/reducers/index.ts
import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {routerReducer} from "@ngrx/router-store";

export interface GlobalAppState {

}

export const reducers: ActionReducerMap<GlobalAppState> = {
    router: routerReducer
}

// custom meta reducer logger
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  // just a plain reducer function for the Action
  return (state, action) => {
    console.log("custom meta reducer logger - state before action dispatched: ", state)
    console.log("action dispatched: ", action)

    // return output of the regular application
    // continuing reducer chain to the next reducer
    return reducer(state, action);

  }
}

// dev env only in this order of the arrayh
export const metaReducers: MetaReducer<GlobalAppState>[] = !environment.production ? [logger] : [];
