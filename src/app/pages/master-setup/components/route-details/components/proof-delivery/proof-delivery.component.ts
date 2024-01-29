import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-proof-delivery',
  templateUrl: './proof-delivery.component.html',
  styleUrls: ['./proof-delivery.component.scss']
})
export class ProofDeliveryComponent implements OnInit {

  constructor() { }
  @Input() deliveryData = {
    location:"",
    customerCode:"",
    customerName:"",
    isCashCustomer:"N"
  } as any;
  @Input() totalData = [];
  @Output() closeModalEmitter = new EventEmitter();
  photoText = "Product";
  signatureText = "Signature";
  ngOnInit(): void {
  }
  closeModal(){
    this.closeModalEmitter.emit();
  }
  changeImageWithClick(imageClick:string,imageNeedtobeChange:string,deliveryBox:any){
    let image = "";
    image = deliveryBox[imageClick];
    deliveryBox[imageClick] = deliveryBox[imageNeedtobeChange];
    deliveryBox[imageNeedtobeChange]= image;
    if(imageClick === "photo"){
      this.photoText = "Product";
      this.signatureText = "Signature";
    }
    if(imageClick === "signature") {
      this.photoText = "Signature";
      this.signatureText = "Product";
    }
  }
}
