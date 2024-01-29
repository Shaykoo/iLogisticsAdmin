import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlCenterPageComponent } from './components/control-center-page/control-center-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouteDetailsComponent } from './components/route-details/route-details.component';
import { ProofDeliveryComponent } from './components/route-details/components/proof-delivery/proof-delivery.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { MasterSetupComponent } from './master-setup.component';

const routes: Routes = [
    {
        path:"",
        component:MasterSetupComponent,
        children:[
            { path: 'control', component: ControlCenterPageComponent },
            { path: 'routes', component: RouteDetailsComponent},
            { path: 'drivers', component: DriverDetailsComponent}
        ]
    }
];
@NgModule({
    declarations: [
        ControlCenterPageComponent,
        RouteDetailsComponent,
        ProofDeliveryComponent,
        DriverDetailsComponent,
        MasterSetupComponent
        ],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class MasterSetupModule {}
