import {createAction} from "@ngrx/store";

// dispatch this action before showing the courses screen
// use routerresolver to load data before showing the target screen (courses screen)
export const loadAllCourses = createAction(
  // [Origin of the action] What happens with this action -- action is More of a Command not the event --  not event that happened in the past, more of a command happening in the present
  "[Courses Resolver] Load all courses"
)
