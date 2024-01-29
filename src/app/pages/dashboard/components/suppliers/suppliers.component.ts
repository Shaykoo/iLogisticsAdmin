import { Component, OnInit, ViewEncapsulation } from '@angular/core';
export interface PeriodicElement {
  code: number;
  list: string;
  truck: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { code: 1134, list: 'ยุทธพล ทรานสปอร์ต', truck: "YTP" },
  { code: 1134, list: 'บริษัท แพนเอเชียโลจิสติกส์ (ประเทศไทย) จํากัด', truck: "YTP" },
  { code: 1134, list: 'บริษัท แพนเอเชียโลจิสติกส์ (ประเทศไทย) จํากัด', truck: "YTP" },
  { code: 1134, list: 'บริษัท แพนเอเชียโลจิสติกส์ (ประเทศไทย) จํากัด', truck: "YTP" },
  { code: 1134, list: 'บริษัท แพนเอเชียโลจิสติกส์ (ประเทศไทย) จํากัด', truck: "YTP" },
  { code: 1134, list: 'บริษัท แพนเอเชียโลจิสติกส์ (ประเทศไทย) จํากัด', truck: "YTP" },
  { code: 1134, list: 'บริษัท แพนเอเชียโลจิสติกส์ (ประเทศไทย) จํากัด', truck: "YTP" },
  { code: 1134, list: 'บริษัท แพนเอเชียโลจิสติกส์ (ประเทศไทย) จํากัด', truck: "YTP" },
];

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SuppliersComponent implements OnInit {  
  displayedColumns: string[] = ['code', 'list', 'truck'];   
  dataSource = ELEMENT_DATA;  
  supplierContact=false
  supplierDriver=true
  constructor() { }

  ngOnInit(): void {
  }  
  
}
