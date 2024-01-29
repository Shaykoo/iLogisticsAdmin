import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from './shared/helpers/error-interceptor.service';
import { LoaderInterceptor } from './shared/helpers/loader-interceptor.service';
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule.forRoot()],
    exports: [],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
