// Make sure multiple login actions have the same type of action type so create this auth.actions.ts file so that the action log is more readable

import {createAction, props} from "@ngrx/store";
import {User} from "./model/user.model";

// [auth.service.ts] login(email:string, password:string): Observable<User> {

// Standardized format for actions: [Source of Action] event or command the action corresponds to
export const loginActionCreator = createAction(
  "[Login Page] User Login",
        props<{user: User}>() // ngrx utility function props, no arguments, just 1 generic param for type of payload to have typesafe payload. should be plain javascript object
)
// login is NOT the type definition of class, it is action creator function that we call in order to create an action

// const newLoginAction = login({user})
