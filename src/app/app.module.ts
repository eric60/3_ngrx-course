import {BrowserModule} from '@angular/platform-browser';
import {isDevMode, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';

import {EffectsModule} from '@ngrx/effects';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthGuard} from "./auth/auth.guard";
import {metaReducers, reducers} from "./reducers";


const routes: Routes = [
  {
    // lazily load courses module to reduce application bundle size
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent], imports: [BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(), // eagerly load the AuthModule

    /*
    Always keep forRoot at the root: Your main application module (AppModule) must still include StoreModule.forRoot({}), even if you are lazy-loading all of your feature states.
     */
    StoreModule.forRoot(reducers,
      {
        metaReducers, // The main difference is metaReducers are processed BEFORE the normal reducers are invoked e.g. login action ==> trigger metaReducer logger() first BEFORE the authReducer actions on(loginAction) are triggerred
        runtimeChecks: {
          strictStateImmutability: true, // this ensures state can never be accidentally mutated directly by app code like reducers state.user = action.user --> should always return new versions
          // one example of a metareducer in previous version of ngrx, strictStateImmutability was implemented by a metareducer
          strictActionImmutability: true, // no good reason for state to mutate action object, should always return since it would break time travelling debugger
          strictActionSerializability: true, // ensures actions are serializable (e.g. runtime check fails since dates not serializable in js, so it needs to be string format
          strictStateSerializability: true // ensures state is always serializable if need to store data locally like in chrome localstorage
        }
      }),

    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot([]),
      StoreRouterConnectingModule.forRoot({
        stateKey: 'router', // ngrx router store and time travelling debugger (very very useful to debug all user actions) to store a snapshot of the router state to transition/time travel to previous action and routes of the current page to. data: url, params
        routerState: RouterState.Minimal // saves lightweight serializable object of state of current url, parameters for transitioning to that particular router state
        // router store actions:  @ngrx/router-store/request ==> @ngrx/router-store/navigation (url '/' => '/courses') ==> @ngrx/router-store/navigated
      })
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule {
}
