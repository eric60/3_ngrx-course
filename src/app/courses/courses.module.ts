import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {CoursesCardListComponent} from './courses-card-list/courses-card-list.component';
import {EditCourseDialogComponent} from './edit-course-dialog/edit-course-dialog.component';
import {CoursesHttpService} from './services/courses-http.service';
import {CourseComponent} from './course/course.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import {EntityDataService, EntityDefinitionService, EntityMetadataMap} from '@ngrx/data';
import {compareCourses, Course} from './model/course';

import {compareLessons, Lesson} from './model/lesson';
import {CoursesResolver} from "./courses.resolver";
import {EffectsModule} from "@ngrx/effects";
import {CoursesEffects} from "./courses.effects";
import {StoreModule} from "@ngrx/store";
import {coursesReducer} from "./reducers/course.reducers";


export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      courses: CoursesResolver
    }

  },
  {
    path: ':courseUrl',
    component: CourseComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,

    /*
    Root vs. Feature: Use forRoot() only once in your AppModule to initialize the global store. Use forFeature() for all subsequent feature-specific modules.

    Lazy Loading: Registering state via forFeature() is essential for lazy-loaded modules, as it ensures the state slice is only added to the global store tree when that module is actually loaded.

    Naming: The string key used in forFeature (e.g., 'books') becomes the property name in your global state object. Use a constant or a Feature Creator to avoid hardcoding strings.
     */
    RouterModule.forChild(coursesRoutes),
    // EffectsModule.forRoot(),
    EffectsModule.forFeature([CoursesEffects]),
    StoreModule.forFeature('courses', coursesReducer) // not necessary anymore and breaks code if you uncomment

    // Standalone Applications: If you are building an application without NgModules, use the provideState({ name: 'books', reducer: booksReducer }) function in your routing configuration instead.
    // In NgRx, StoreModule.forFeature registers a specific, localized slice of state and its corresponding reducers only when that specific feature module is loaded. It is primarily used to optimize large applications and modularize lazy-loaded routes
    // courses.module is lazy loaded feature module, define state key under "courses" key and reducer that takes care of the entity
    // StoreModule.forFeature("courses", coursesReducer)
    // Update: If you are building a modern Angular application, StoreModule is no longer strictly needed because Angular has moved toward module-free, standalone architecture, NgRx provides functional APIs to set up your state management, rendering StoreModule obsolete unless you are maintaining a legacy codebase that still relies heavily on NgModules
    // Instead of importing StoreModule.forRoot and StoreModule.forFeature in an NgModule, you can use the provideStore and provideState functions inside your application’s configuration or bootstrap process:
    // At the root level: Use provideStore() in your app.config.ts.
    // For features/lazy loaded routes: Use provideState() in your route provider
    // For a deeper dive into the module-free NgRx ecosystem, you can check out the official NgRx Standalone Setup Guide or explore the newer NgRx Signal Store for an even lighter alternative.
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  providers: [ // providers of data
    CoursesHttpService,
    CoursesResolver // import injectable services
  ]
})
export class CoursesModule {

  constructor() {

  }


}
