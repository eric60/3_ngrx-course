import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

export const authFeatureKey = 'auth';

export interface AppGlobalState {

}

export const reducers: ActionReducerMap<AppGlobalState> = {

};
