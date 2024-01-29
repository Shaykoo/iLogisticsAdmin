import { Component, OnInit, ViewEncapsulation } from '@angular/core';
export interface PeriodicElement {
  no: string;
  tasktype: string;
  finalroute: string;
  accounttype: string;
  controlled: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },
  { no: '001', tasktype: 'Warehouse to customer', finalroute: '', accounttype: '', controlled: '' },

];
@Component({
  selector: 'app-route-task-type',
  templateUrl: './route-task-type.component.html',
  styleUrls: ['./route-task-type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RouteTaskTypeComponent implements OnInit {
  displayedColumns = ['no', 'tasktype', 'finalroute', 'accounttype', 'controlled'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
