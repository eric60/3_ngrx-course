import {createReducer, on} from "@ngrx/store";
import {Course} from "../model/course";
import {CourseActions} from "../action-types";

/*
ngrx entity --> need to look up entities in ngrx store so need K:V map instead of just an array
 */
export interface CourseState {
  courses: Course[]
}

export const initialCourseState: CourseState = {
  courses: undefined
}

export const courseReducer = createReducer(
  initialCourseState,
  on(CourseActions.loadAllCourses, (state, action) => {
    return {
      courses: action.courses
    }
  })
)
