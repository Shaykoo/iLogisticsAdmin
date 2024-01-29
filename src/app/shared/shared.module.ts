import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DurationPipe } from './pipes/duration.pipe';
import { GoogleMapsModule } from '@angular/google-maps';
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [
    DurationPipe
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        HttpClientModule,
        GoogleMapsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        HttpClientModule,
        DurationPipe,
        GoogleMapsModule,
        DatePipe
    ],
    providers: [
        DatePipe 
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<NgModule> {
        return {
            ngModule: SharedModule,
        };
    }
}
