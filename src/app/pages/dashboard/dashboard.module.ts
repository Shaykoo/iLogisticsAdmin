import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { UploadfilesComponent } from './components/uploadfiles/uploadfiles.component';
import { UploadcontractComponent } from './components/uploadcontract/uploadcontract.component';
import { SupplierContactsComponent } from './components/supplier-contacts/supplier-contacts.component';
import { SupplierDriversComponent } from './components/supplier-drivers/supplier-drivers.component';
import { TruckSupplyComponent } from './components/truck-supply/truck-supply.component';
import { SupplierChargesComponent } from './components/supplier-charges/supplier-charges.component';
import { TruckTypeComponent } from './components/truck-type/truck-type.component';
import { RouteTaskTypeComponent } from './components/route-task-type/route-task-type.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard/supplier/contacts'},
  {
    path: "",
    component: DashboardComponent,
    children: [
      { 
        path: 'supplier',
        component: SuppliersComponent,
        children:[
          {
            path:"contacts",
            component:SupplierContactsComponent
          },
          {
            path:"drivers",
            component:SupplierDriversComponent
          },
          {
            path:"supply",
            component:TruckSupplyComponent
          },
          {
            path:"charges",
            component:SupplierChargesComponent
          }
        ]
       },
      { path: 'truck-type', component: TruckTypeComponent},
      { path: 'route-task-type', component: RouteTaskTypeComponent},
    ]
  },
  
];
@NgModule({
  declarations: [
    DashboardComponent,
    SuppliersComponent,
    UploadfilesComponent,
    UploadcontractComponent,
    SupplierContactsComponent,
    SupplierDriversComponent,
    TruckSupplyComponent,
    SupplierChargesComponent,
    TruckTypeComponent,
    RouteTaskTypeComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class DashboardModule { }
