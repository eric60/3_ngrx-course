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
    StoreModule.forRoot(reducers, {metaReducers}),
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
