import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {GlobalAppState} from "../reducers";
import {Store} from "@ngrx/store";
import {finalize, first, tap} from "rxjs/operators";
import {allCoursesLoaded, loadAllCourses} from "./course.actions";

/*
Are angular services singletons?

Angular services are singletons by default. This means that within a typical application, Angular’s Dependency Injection (DI) system creates only one instance of a service and shares it across all components that request it.

Module-level Scope: If a service is added to the providers array of a specific NgModule, it is a singleton **only within the scope of that module and its children.**

Component-level Instances: If you add a service to a specific component's providers array, Angular creates a **new instance** of that service **for every instance of that component**. This prevents it from being an app-wide singleton and is useful for **keeping state local to a component tree.**

component-level instances
===========================
component instance 1 --> service instance 1
component instance 2--> service instance 2

vs
app-level instances
===========================
component instance 1 --> service instance 1
component instance 2 --> service instance 1



Lazy Loading: Services provided in lazy-loaded modules can sometimes result in multiple instances if they are not correctly configured (e.g., if the same service is provided in both the root and a lazy module's providers).

Summary of Scope
Location of Provider 	===> Number of Instances
@Injectable({ providedIn: 'root' })	===> One per application
NgModule.providers (Root Module)	===> One per application
Component.providers([])	===> One per component instance
Lazy-loaded NgModule.providers([])	===> One per lazy-loaded module instance

 */
/*
Resolve service runs BEFORE Router completes transition

Router Resolver ensured the **target screen** does not display UNLESS the data has been loaded and available-- else if data not loaded then cancelled -- never show user empty screens with no data
 */
@Injectable()
export class CoursesResolver implements Resolve<any> {

  isLoading: boolean = false;

  constructor(private store: Store<GlobalAppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // query store to see if data is loaded yet
    // trigger allCoursesLoaded Actions through a sideeffect in the tap rxjs operator
    // ensure observable completion for router to complete the route transition, else route transition hangs and never see target screen with courses

    return this.store
      .pipe(
        tap(() => {
          if (!this.isLoading) {
            this.isLoading = true
            this.store.dispatch(loadAllCourses())
          }

        }),
        first(),
        finalize(() => this.isLoading = false) // use finalize operator to ensure isLoading back to false after the observable completes
      )

    // Problem: 2 instances of the [Course Resolver] Load All Courses Action because with router devtools, the store is emitting multiple times during router transition. Solution: add loading flag
  }
}
