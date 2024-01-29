import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadcontractComponent } from '../uploadcontract/uploadcontract.component';
import { UploadfilesComponent } from '../uploadfiles/uploadfiles.component';
export interface ContractElement {
  seq: number;
  desc: string;
  startdate: string;
  enddate: string;
  files: string;
  action: string;
}
export interface weblogin {
  name: string;
  phone: string;
}
export interface contactdata {
  name: string;

}
const ContractElement_DATA: ContractElement[] = [
  { seq: 1, desc: 'Contract 2016', startdate: "22/02/2022", enddate: "22/02/2022", files: "22/02/2022", action: '' },
  { seq: 2, desc: 'Contract 2016', startdate: "22/02/2022", enddate: "22/02/2022", files: "22/02/2022", action: '' },
  { seq: 3, desc: 'Contract 2016', startdate: "22/02/2022", enddate: "22/02/2022", files: "22/02/2022", action: '' },
  { seq: 4, desc: 'Contract 2016', startdate: "22/02/2022", enddate: "22/02/2022", files: "22/02/2022", action: '' },
  { seq: 5, desc: 'Contract 2016', startdate: "22/02/2022", enddate: "22/02/2022", files: "22/02/2022", action: '' },
  { seq: 6, desc: 'Contract 2016', startdate: "22/02/2022", enddate: "22/02/2022", files: "22/02/2022", action: '' },
];
const weblogin_DATA: weblogin[] = [
  { name: "Supachokedee", phone: '0842835235' },
  { name: "Supachokedee", phone: '0842835235' },
  { name: "Supachokedee", phone: '0842835235' },
  { name: "Supachokedee", phone: '0842835235' },
];
const contactdata: contactdata[] = [
  { name: "Supachokedee" },
  { name: "Supachokedee" },
  { name: "Supachokedee" },
  { name: "Supachokedee" },
  { name: "Supachokedee" },

];
@Component({
  selector: 'app-supplier-contacts',
  templateUrl: './supplier-contacts.component.html',
  styleUrls: ['./supplier-contacts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierContactsComponent implements OnInit {
  contractdata: string[] = ['seq', 'desc', 'startdate', 'enddate', 'files', 'action'];
  displayelogindata: string[] = ['name', 'phone'];
  contactdata: string[] = ['name'];
  logindataSource = weblogin_DATA;
  contactSource = contactdata;
  contractdataSource = ContractElement_DATA;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  uploadfilesDialog() {
    this.dialog.open(UploadfilesComponent, {
      panelClass: 'mat-dialog-uploadfiles'
    });
  }
  uploadcontractDialog() {
    this.dialog.open(UploadcontractComponent, {
      panelClass: 'mat-dialog-uploadcontracts'
    });
  }

}
