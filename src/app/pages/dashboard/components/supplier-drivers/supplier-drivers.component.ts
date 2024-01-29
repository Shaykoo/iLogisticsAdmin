import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface ContractElement {
  drivername: string;
  nickname: string;
  tel: string;
  numberid: string;
  startdate: string;
  activestatus: string;
  lastactive: string;
}
const ContractElement_DATA: ContractElement[] = [
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
  { drivername: 'สมพงศ์ สมนํ้าสมเนื้อ', nickname: 'บาส', tel: "064-2345999", numberid: "1385066849204", startdate: "22/02/2022", activestatus: '', lastactive: '22/02/2022' },
];
@Component({
  selector: 'app-supplier-drivers',
  templateUrl: './supplier-drivers.component.html',
  styleUrls: ['./supplier-drivers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierDriversComponent implements OnInit {
  contractdata: string[] = ['drivername', 'nickname', 'tel', 'numberid', 'startdate', 'activestatus', 'lastactive'];
   contractdataSource = new MatTableDataSource(ContractElement_DATA);
  constructor(private _liveAnnouncer: LiveAnnouncer) { }
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.contractdataSource.sort = this.sort;
  }
  ngOnInit(): void {
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
