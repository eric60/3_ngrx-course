// https://github.com/angular-university/ngrx-course/blob/master/src/app/reducers/index.ts
import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {routerReducer} from "@ngrx/router-store";

export interface GlobalAppState {

}

export const reducers: ActionReducerMap<GlobalAppState> = {
    router: routerReducer
}

export const metaReducers: MetaReducer<GlobalAppState>[] = !environment.production ? [] : [];
