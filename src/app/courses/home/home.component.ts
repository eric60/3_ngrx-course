import {Component, OnInit} from '@angular/core';
import {compareCourses, Course} from '../model/course';
import {Observable} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {map, shareReplay} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    loading$: Observable<boolean>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    constructor(
      private dialog: MatDialog,
      private coursesHttpService: CoursesHttpService) {

    }

    ngOnInit() {
      this.reload(); // problem: bad UX: constantly see loading screen, solution: Load just one time and fetch data from store (with selector) rather than backend (with CoursesHttpService)
      /*
      Step 1
      1. 1st step in ngrx is always to define the actions first (loadAllCourses, coursesAllLoaded=createAction) to implement handling of the course data ===> src/app/courses/courses.actions.ts
      2. 2nd step in ngrx is to define the effects ($loadCourses=createEffect)
       */
    }

  reload() {

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
