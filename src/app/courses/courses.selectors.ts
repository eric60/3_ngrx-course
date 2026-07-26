// selectors are functions to query the data

// select all data in the CoursesState (see screenshot)
// featureselector since selector selects state corresponding to the courses feature

import {CoursesState} from "./reducers/course.reducers";
import {createFeatureSelector} from "@ngrx/store";

export const selectCoursesState = createFeatureSelector<CoursesState>("courses");
