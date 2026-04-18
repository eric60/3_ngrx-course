import {Inject, Injectable} from "@angular/core";
import {CoursesHttpService} from "./services/courses-http.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CourseActions} from "./action-types";
import {concatMap, map} from "rxjs/operators";
import {allCoursesLoaded} from "./course.actions";

@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CourseActions.loadAllCourses),
        // need to return a new action so use concatMap or mergeMap
        concatMap(action =>
          // only call backend once
          this.courseHttpService.findAllCourses()
        ),
        map(courses => allCoursesLoaded({courses}))
      )
  )

  constructor(private actions$: Actions,
              private courseHttpService: CoursesHttpService) {
  }

}
