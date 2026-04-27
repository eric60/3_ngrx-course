import {createAction, props} from "@ngrx/store";
import {Course} from "./model/course";

// dispatch this action before showing the courses screen
// use routerresolver to load data before showing the target screen (courses screen)
export const loadAllCourses = createAction(
  // [Origin of the action] What happens with this action ---> This Action is More of a Command happening right now in the **present**, not an event that happened in the **past**
  "[Courses Resolver] Load all courses", props<{courses: Course[]}>()
)


// already designing our solution by creating the actions
// courses resolver --> emit loadAllCourses action --> trigger Load Courses Effect and call the backend --> dispatch new action allCoursesLoaded which will save the courses data in the store
// This action is more of an event that happened in the **past**
export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All Courses Loaded", props<{courses: Course[]}>()
)
