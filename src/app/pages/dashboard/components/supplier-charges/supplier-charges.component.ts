import { Component, OnInit, ViewEncapsulation } from '@angular/core';
export interface DataElement {
  code: string;
  desc: string;
  type1: string;
  type2: string;
  type3: string;
  type4: string;
  type5: string;
  type6: string;
  type7: string;
  type8: string;
  type9: string;
  type10: string;
  type11: string;
  type12: string;
}
const ELEMENT_DATA: DataElement[] = [
  {
    code: 'A1240',
    desc: 'นํ้าแร่ รูทกลาง คันที่ 1',
    type1: "1,150.00",
    type2: "1,150.00",
    type3: "1,150.00",
    type4: "1,150.00",
    type5: "1,150.00",
    type6: "1,150.00",
    type7: "1,150.00",
    type8: "1,150.00",
    type9: "1,150.00",
    type10: "1,150.00",
    type11: "1,150.00",
    type12: "1,150.00",
   },
  {
    code: 'A1240',
    desc: 'นํ้าแร่ รูทกลาง คันที่ 1',
    type1: "1,150.00",
    type2: "1,150.00",
    type3: "1,150.00",
    type4: "1,150.00",
    type5: "1,150.00",
    type6: "1,150.00",
    type7: "1,150.00",
    type8: "1,150.00",
    type9: "1,150.00",
    type10: "1,150.00",
    type11: "1,150.00",
    type12: "1,150.00",
   },
  {
    code: 'A1240',
    desc: 'นํ้าแร่ รูทกลาง คันที่ 1',
    type1: "1,150.00",
    type2: "1,150.00",
    type3: "1,150.00",
    type4: "1,150.00",
    type5: "1,150.00",
    type6: "1,150.00",
    type7: "1,150.00",
    type8: "1,150.00",
    type9: "1,150.00",
    type10: "1,150.00",
    type11: "1,150.00",
    type12: "1,150.00",
   },
  {
    code: 'A1240',
    desc: 'นํ้าแร่ รูทกลาง คันที่ 1',
    type1: "1,150.00",
    type2: "1,150.00",
    type3: "1,150.00",
    type4: "1,150.00",
    type5: "1,150.00",
    type6: "1,150.00",
    type7: "1,150.00",
    type8: "1,150.00",
    type9: "1,150.00",
    type10: "1,150.00",
    type11: "1,150.00",
    type12: "1,150.00",
   },
  {
    code: 'A1240',
    desc: 'นํ้าแร่ รูทกลาง คันที่ 1',
    type1: "1,150.00",
    type2: "1,150.00",
    type3: "1,150.00",
    type4: "1,150.00",
    type5: "1,150.00",
    type6: "1,150.00",
    type7: "1,150.00",
    type8: "1,150.00",
    type9: "1,150.00",
    type10: "1,150.00",
    type11: "1,150.00",
    type12: "1,150.00",
   },
  {
    code: 'A1240',
    desc: 'นํ้าแร่ รูทกลาง คันที่ 1',
    type1: "1,150.00",
    type2: "1,150.00",
    type3: "1,150.00",
    type4: "1,150.00",
    type5: "1,150.00",
    type6: "1,150.00",
    type7: "1,150.00",
    type8: "1,150.00",
    type9: "1,150.00",
    type10: "1,150.00",
    type11: "1,150.00",
    type12: "1,150.00",
   },
  {
    code: 'A1240',
    desc: 'นํ้าแร่ รูทกลาง คันที่ 1',
    type1: "1,150.00",
    type2: "1,150.00",
    type3: "1,150.00",
    type4: "1,150.00",
    type5: "1,150.00",
    type6: "1,150.00",
    type7: "1,150.00",
    type8: "1,150.00",
    type9: "1,150.00",
    type10: "1,150.00",
    type11: "1,150.00",
    type12: "1,150.00",
   },
  {
    code: 'A1240',
    desc: 'นํ้าแร่ รูทกลาง คันที่ 1',
    type1: "1,150.00",
    type2: "1,150.00",
    type3: "1,150.00",
    type4: "1,150.00",
    type5: "1,150.00",
    type6: "1,150.00",
    type7: "1,150.00",
    type8: "1,150.00",
    type9: "1,150.00",
    type10: "1,150.00",
    type11: "1,150.00",
    type12: "1,150.00",
   },
  {
    code: 'A1240',
    desc: 'นํ้าแร่ รูทกลาง คันที่ 1',
    type1: "1,150.00",
    type2: "1,150.00",
    type3: "1,150.00",
    type4: "1,150.00",
    type5: "1,150.00",
    type6: "1,150.00",
    type7: "1,150.00",
    type8: "1,150.00",
    type9: "1,150.00",
    type10: "1,150.00",
    type11: "1,150.00",
    type12: "1,150.00",
   },
  {
    code: 'A1240',
    desc: 'นํ้าแร่ รูทกลาง คันที่ 1',
    type1: "1,150.00",
    type2: "1,150.00",
    type3: "1,150.00",
    type4: "1,150.00",
    type5: "1,150.00",
    type6: "1,150.00",
    type7: "1,150.00",
    type8: "1,150.00",
    type9: "1,150.00",
    type10: "1,150.00",
    type11: "1,150.00",
    type12: "1,150.00",
   },
  
];
@Component({
  selector: 'app-supplier-charges',
  templateUrl: './supplier-charges.component.html',
  styleUrls: ['./supplier-charges.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierChargesComponent implements OnInit {
  dataSourceElement: string[] = [
    'code',
    'desc',
    'type1',
    'type2',
    'type3',
    'type4',
    'type5',
    'type6',
    'type7',
    'type8',
    'type9',
    'type10',
    'type11',
    'type12',    
  ];
  dataSource = ELEMENT_DATA  
  constructor() { }

  ngOnInit(): void {
  }

}
