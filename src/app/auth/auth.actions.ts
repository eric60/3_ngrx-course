// Make sure multiple login actions same type of action type so create this auth.actions.ts file then action log more readable

import {createAction, props} from "@ngrx/store";
import {User} from "./model/user.model";

// Standard: [Source of Action] event or command the action corresponds to
export const login = createAction(
  "[Login Page] User Login",
        props<{user: User}>() // ngrx utility function props, no arguments, just 1 generic param for type of payload to have typesafe payload. should be plain javascript object

)
