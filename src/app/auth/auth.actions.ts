// Make sure multiple login actions have the same type of action type so create this auth.actions.ts file so that the action log is more readable

import {createAction, props} from "@ngrx/store";
import {User} from "./model/user.model";

// [auth.service.ts] login(email:string, password:string): Observable<User> {

// Standardized format for actions: [Source of Action] event or command the action corresponds to
export const loginAction = createAction(
  "[Login Page] User Login",
        props<{user: User}>() // ngrx utility function props() has no arguments and just has 1 generic param <T> for the TYPE of the payload to have a typesafe payload. should be plain javascript object
  // export declare function props<P extends SafeProps, SafeProps = NotAllowedInPropsCheck<P>>(): ActionCreatorProps<P>;
)
// login is NOT the type definition of class, it is action creator function that we call in order to create an action

// const newLoginAction = login({user})

export const logoutAction = createAction(
"[Top Menu] User Logout"
)
