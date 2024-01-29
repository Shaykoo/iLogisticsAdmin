import { Component, OnInit, ViewEncapsulation } from '@angular/core';
export interface ChooseTruckElement {
  truckid: string;
  drivername: string;
  detail: string;
}
const ChooseTruckElement_DATA: ChooseTruckElement[] = [
  { truckid: 'YTP051', drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', detail: "4LF-6 สมพงศ์"},
  { truckid: 'YTP051', drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', detail: "4LF-6 สมพงศ์"},
  { truckid: 'YTP051', drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', detail: "4LF-6 สมพงศ์"},
  { truckid: 'YTP051', drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', detail: "4LF-6 สมพงศ์"},
  { truckid: 'YTP051', drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', detail: "4LF-6 สมพงศ์"},
  { truckid: 'YTP051', drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', detail: "4LF-6 สมพงศ์"},
  
];
@Component({
  selector: 'app-truck-supply',
  templateUrl: './truck-supply.component.html',
  styleUrls: ['./truck-supply.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TruckSupplyComponent implements OnInit {
  chooseTruckData: string[] = ['truckid', 'drivername', 'detail'];
  chooseTruckSource = ChooseTruckElement_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
