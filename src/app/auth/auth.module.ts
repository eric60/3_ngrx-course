import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { StoreModule } from '@ngrx/store';
import {AuthService} from "./auth.service";
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './reducers';
import {authFeatureKey, authReducer} from "./reducers";
import {AuthGuard} from "./auth.guard";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild([{path: '', component: LoginComponent}]),
        StoreModule.forFeature(
          authFeatureKey,
          authReducer
        ), // initialize authFeature data with auth feature key and reducer value to load the data  {auth:{}}
        EffectsModule.forFeature([]) // list of side effects implemented as injectable services. e.g. side effect where after user logs in, the auth state is not just populated in store but as side effect persisted in the local browser storage/backend service

    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
              AuthService,
              AuthGuard
            ]
        }
    }
}
