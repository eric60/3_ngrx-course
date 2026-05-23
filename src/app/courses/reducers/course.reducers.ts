import {createReducer, on} from "@ngrx/store";
import {Course} from "../model/course";
import {CourseActions} from "../action-types";
import {createEntityAdapter, EntityState} from "@ngrx/entity";

/*
ngrx entity --> need to look up entities by id --> so convert Array to Map

map of the keys of the entity i.e. the Course.id whose value is the entity corresponding to that key

export interface CoursesState {
  entities: {[key: number]: Course};
  ids: number[]; // ids array used to order the Courses in their natural order.

   // this Entity format interface is the most powerful format to saving entities in the store, but not convenient to handle, so we need reducers to handle the conversion from Courses[] to entity format {[key: number]: Course}  ---> so we can use ngrx entity in a much more concise way by having the EXACT same properties as above by simply doing "extends EntityState<Course>"

  // we can combine entities and ids array to enable a helper function to convert entities to an array of courses in their natural course order e.g. by asc seqNo
}
 */
export interface CoursesState extends EntityState<Course> {
}

let state: CoursesState;
console.log(state.entities)
console.log(state.ids)

/*
ngrx entity makes it easy to store entities in state by providing
(1) dict of entities by id and
(2) array of entities in the natural entity order

utility function
entity adapter is a helper function provided for CRUD operations.
 */
export const adapter = createEntityAdapter<Course>();
adapter.getSelectors();
adapter.updateOne(null, null);
adapter.removeOne(null, null)
adapter.upsertOne(null, null)

export const initialCoursesState = adapter.getInitialState() // each feature module needs to define it's initial state

// reducer to save courses in the entity format - entities: {[key: number]: Course};
export const coursesReducer = createReducer(

  initialCoursesState,

  // CourseActions.loadAllCourses action does not require any reducer logic -- this action simply triggers a side effect that loads data from the backend
  on(CourseActions.allCoursesLoaded, (state, action) => {
    // provide a new version of the CoursesState
    // Before: have to convetr array of action.courses into dict {[key: number]: Course}
    // After: simply use adapter.addMany(new version of CoursesState, current version of CoursesState to use as basis of modifications). In investing and accounting, basis represents the original cost or value of an asset, used to calculate capital gains or losses when it is sold.
    return adapter.addMany(action.courses, state);
    // return {
    //   courses: state
    // }
  })
)


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
