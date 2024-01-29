import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, concatMap, EMPTY, of, Subject, Subscription, switchMap, take,takeUntil,tap } from 'rxjs';
import { CustomerData } from '../../models/customer-data.model';
import { IRouteCode } from '../../models/route-code.model';
import {IRouteInfo} from "../../models/route-info.model";
import { IRouteSequence } from '../../models/route-sequence.model'; 
import { UtilsService } from '../../../../shared/helpers/utils.service';
import { MasterDataService } from '../../services/master-data.service';
import { MapService } from '../../services/map.service';
import { FirebaseService } from '../../services/firebase.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { environment } from '../../../../../environments/environment';
import { RouterLinkWithHref } from '@angular/router';
import { MatSort } from '@angular/material/sort';
declare const google: any;

export interface routeData {
  routeCode: string;
  cust: number;
  start: string;
  finish: string;
  issues: string;
}
export interface customerRouteData {
  liveStatus: string;
  customerCode: string;
  customerName: string;
  scheduleAt: string;
  checkIn: string;
  checkOut: string;
  duration: string | void;
  location: string;
  delivery:string;
  isCashCustomer:string;
  deliverySequence?:string | undefined;
  branchName?:string | undefined;
}

export interface Ilatslngs {
  lat:number;
  lng:number
}
export const car = 'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})

export class RouteDetailsComponent implements OnInit, AfterViewInit {
  invoiceNo(invoiceNo: any) {
    throw new Error('Method not implemented.');
  }
  customerDataColumns: string[] = ['liveStatus', 'deliverySequence','branchName','customerCode', 'customerName', 'scheduleAt', 'checkIn', 'checkOut', 'duration', 'location', 'delivery'];
  customerData = new MatTableDataSource<customerRouteData>();
  routeDataColumns: string[] = ['select', 'routeCode', 'cust', 'start', 'finish', 'issue'];
  routeData = new MatTableDataSource<routeData>();
  selection = new SelectionModel<routeData>(true, []);
  constructor(
    private masterDataService:MasterDataService,
    private utilService:UtilsService,
    private mapService: MapService,
    private firebaseService: FirebaseService,
    private readonly renderer: Renderer2, private readonly el: ElementRef
  ) { }
  lat: number = 13.736717;
  lng: number = 100.523186;
  latslngs:Ilatslngs[] = [];
  routeCodes:routeData[];
  allRoutesCustomerData:CustomerData[];
  routeInfo!:IRouteInfo;
  routeSequence!:any;
  currentRoute = '';
  searchTerm = null;
  routeAPICodes:any[];
  selectedDate = new Date();
  directionSubscription: Subscription;
  googlePolylineSubscription: Subscription;
  mapDetailsSubscription: Subscription;
  getDriverSubscription: Subscription;
  carIcon: google.maps.Symbol = {
    path: car,
    scale: .7,
    strokeColor: 'white',
    strokeWeight: .10,
    fillOpacity: 1,
    fillColor: '#404040',
    anchor: new google.maps.Point(10, 25),
    rotation: undefined,
  };
  carMarkers: google.maps.Marker;
  isDriverLocationCreated = false;
  polyLineOptions = {
    path: [],
    strokeColor: '#9FE2BF',
    strokeWeight: 4,
  };
  allLocations = [];
  allDestination: any[] = [];

  @ViewChild('map', { static: false }) myMap:any;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  customerCode: string;

  polylineForData: google.maps.Polyline;

  selectedMarkerCustomer: string;
  selectedMarkerDelivery: string;
  public mapError: boolean = false;
  public mapErrorReason: string;

  // In case of more than one route
  public allMarker: any[] = [];
  dateSelectionSub$ = new Subject();
  showOverlay = false;
  deliveryData = [
    {
        "COMPANY": "JB",
        "TRANSACTION_TYPE": "IN",
        "INV_BOOK": "IN64",
        "INV_NO": 3035899,
        "PHOTO": "https://storage.googleapis.com/ilogistics-assets/aa616abfdf582d4290050f6b571e4a231617780813533.jpeg",
        "AUDIO": null,
        "SIGNATURE": "https://storage.googleapis.com/ilogistics-assets/bcc7ed59dcb0d6ae951dfc424a3638751617780812058.jpeg",
        "PAYMENT_SLIP": null,
        "ISDONE": "Y",
        "PRODUCT_CODE": "DRCDRW34620017R",
        "PRODUCT_NAME": "Dairy Whip Whipped Cream (6x400g)",
        "QTY": 1,
        "UNIT": "CT",
        "RATE": 702,
        "SUB_TOTAL": 702,
        "UNIT_LOW": "CA",
        "QTY_LOW": 6,
        "BOX_NO": null,
        "PROCESS_LG": "N"
    },
    {
        "COMPANY": "JB",
        "TRANSACTION_TYPE": "IN",
        "INV_BOOK": "IN64",
        "INV_NO": 3035899,
        "PHOTO": "FILE PATH",
        "AUDIO": "FILE PATH",
        "SIGNATURE": "FILE PATH",
        "PAYMENT_SLIP": null,
        "ISDONE": "Y",
        "PRODUCT_CODE": "DRCDRW34620017R",
        "PRODUCT_NAME": "Dairy Whip Whipped Cream (6x400g)",
        "QTY": 1,
        "UNIT": "CT",
        "RATE": 702,
        "SUB_TOTAL": 702,
        "UNIT_LOW": "CA",
        "QTY_LOW": 6,
        "BOX_NO": null,
        "PROCESS_LG": "N"
    }
];
proofDeliveryData = {} as any;
totalDeliveryBox = [] as any;
selectedRouteData:routeData;
allRouteCodes:routeData[];
@ViewChild(MatSort) sort: MatSort;
mapRenderer:any;
  ngOnInit(): void {
    // const defaultMobile = '0817152986';
    // const defaultRouteCode = 'AB11D';
    
    this.firebaseService.addedNewLocation.pipe(takeUntil(this.dateSelectionSub$)).subscribe((data: any) => {
      console.log("one data from firebase", data);
      this.getAndUpdateDriverLocation(data);
    });
    this.firebaseService.driversLocations.pipe(takeUntil(this.dateSelectionSub$)).subscribe((data) => {
      console.log("firebase all data", data);
      if (Array.isArray(data) && data.length) {
        for (let i = 0; i < data.length; i++) {
          this.getAndUpdateDriverLocation(data[i]);
        }
      }
    })
    if (environment.production === false) {
      console.log("request firebase dev data");
      const defaultFirebaseQuery = {
          defaultMobile: '0817152986',
          defaultRouteCode: 'AB11D',
          defaultDate: new Date('2022, 03, 04')
        }
        const { defaultMobile, defaultRouteCode, defaultDate } = defaultFirebaseQuery
        this.firebaseService.getDriverData(defaultMobile, defaultRouteCode, defaultDate);
        this.firebaseService.getDriverDataOnChange(defaultMobile, defaultRouteCode, defaultDate);
    }

    this.googlePolylineSubscription = this.mapService.getPolylineData
            .subscribe((polyline: google.maps.Polyline) => {
              this.polylineForData = polyline;
    });
    this.masterDataService.dateSelection.pipe(takeUntil(this.dateSelectionSub$)).subscribe((selectedDate)=>{
      this.selectedDate = selectedDate as any;
      this.fetchCustomerRouteData();
    });
    this.directionSubscription = this.mapService.googleDirection
    .subscribe((data: google.maps.DirectionsResult) => {
      this.mapService.saveRouteInfo(data);
      this.mapRenderer?.setMap(null);
      this.mapRenderer = new google.maps.DirectionsRenderer({
        map: this.myMap.googleMap,
        suppressMarkers: true,
        polylineOptions: {
          strokeWeight: 5,
          strokeColor: '#0C28CF',
        },
      });
      // renderer.setDirections(null);
      this.mapRenderer.setDirections(data);
    });    
}

  ngAfterViewInit() {
    const position = new google.maps.LatLng({ lat: +this.lat, lng: +this.lng })
    this.myMap.googleMap.setCenter(position);
    this.routeData.sort = this.sort;
  }
getAndUpdateDriverLocation(value: any) {
  const { lat, long, mobile, route, datetime } = value;
  const date = new Date(datetime);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateString =`${year}_${month}_${day}`;
  const uKey = `${dateString}_${mobile}_${route}`;
  console.log("firebase data", value);
  if (lat && typeof lat === 'number') {
    if (this.isDriverLocationCreated === false) {
      this.createDriverLocation(lat, long, uKey);
    } else {
      this.updateDriverLocation(lat, long, uKey);
    }
  }
}
updateDriverLocation(latitude: number, longitude: string | number, uKey: string) {
  const lastPosn = this.carMarkers.getPosition();
  const position = new google.maps.LatLng({ lat: +latitude, lng: +longitude });
  this.carMarkers.setPosition(position);
  if (!!lastPosn) {
    const heading = google.maps.geometry.spherical.computeHeading(lastPosn, position);
    this.carIcon.rotation = heading;
    this.carMarkers.setIcon(this.carIcon);
  }
  
}

createDriverLocation(latitude: number, longitude: string | number, uKey: string) {
  
  const position = new google.maps.LatLng({ lat: +latitude, lng: +longitude });
  this.myMap.googleMap.setCenter(position);
  this.carMarkers?.setMap(null);
  this.carMarkers = new google.maps.Marker({
    icon: this.carIcon,
    map: this.myMap.googleMap,
    position,
  });
  this.isDriverLocationCreated = true;
}
getMarkerStyle = (markerObj: any, i: number) => {
  return {
    icon:{
      path: 'm 12,2.4000002 c -2.7802903,0 -5.9650002,1.5099999 -5.9650002,5.8299998 0,1.74375 1.1549213,3.264465 2.3551945,4.025812 1.2002732,0.761348 2.4458987,0.763328 2.6273057,2.474813 L 12,24 12.9825,14.68 c 0.179732,-1.704939 1.425357,-1.665423 2.626049,-2.424188 C 16.809241,11.497047 17.965,9.94 17.965,8.23 17.965,3.9100001 14.78029,2.4000002 12,2.4000002 Z',
      fillColor: markerObj.isDone==="Y" ? '#56C36F' : '#E5E5E8',
      fillOpacity: 1.0,
      strokeColor: '#000000',
      strokeWeight: 1,
      scale: markerObj.customerCode === this.customerCode && Number(markerObj.invoiceNo) === Number(this.invoiceNo) ? 5 : 2,
      anchor: new google.maps.Point(12, 24),
      labelOrigin: new google.maps.Point(12, 8),
    },
    label: {
      text:  (i + 1).toString(),
      className: 'markerLabel',
      color: markerObj.alreadyCheckout ? '#FFFFFF' : '#000000',
      fontSize: '12px',
      fontWeight: 'bold',
    }
  }
}
openInfoWindow(markerMap: MapMarker, markerInfo: { customerCode: string; deliveryTo: string; }) {
  this.infoWindow.open(markerMap);
  this.selectedMarkerCustomer = markerInfo.customerCode;
  this.selectedMarkerDelivery = markerInfo.deliveryTo;
}


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.routeData.data.forEach(element => this.selection.select(element));
  }

  formateDate(){
    return {
      docDate:this.utilService.formattingDate(this.selectedDate)
    };
  }

  constructRouteCode(route:string){
    return {
      route
    }
  }
  customerDataParams(route:any){
   return {
      route,
      keyword:this.searchTerm || null,
      ...this.formateDate()
    }
 }

  fetchCustomerRouteData() {
    this.masterDataService.getRouteData({
      ...this.formateDate()
    }).pipe(
      tap((response:IRouteCode[])=>{
        this.routeAPICodes = response.map(routeCode=>{
          return {
            ROUTE_CODE:routeCode.ROUTE_CODE
          }
        });
        this.routeCodes = response.map((route) => {
          return {
            routeCode: route.ROUTE_CODE,
            cust: route.CUSTOMER_COUNT,
            start: route.ROUTE_START,
            finish: route.FINISH,
            issues: ''
          }
        });
        this.allRouteCodes = JSON.parse(JSON.stringify(this.routeCodes));
        this.routeData = new MatTableDataSource(this.allRouteCodes);
        this.routeData.sort = this.sort;
      }),
      switchMap((response:IRouteCode[])=> {
        if(response?.length ===  0){
          return EMPTY;
        }
         return combineLatest([
           this.masterDataService.getCustomerData(this.customerDataParams(response[0]?.ROUTE_CODE)),
           this.masterDataService.getRouteInfo({
             ...this.constructRouteCode(response[0]?.ROUTE_CODE),
             ...this.formateDate()
            }),
           this.masterDataService.getRouteSequence({
             ...this.constructRouteCode(response[0]?.ROUTE_CODE),
             ...this.formateDate()
            })
          ]);
      })
    )
      .subscribe(([customerData,routeInfo,routeSequence]) => {
        if(customerData.length === 0){
          return;
        }
        if(!routeSequence){
          return;
        }
        this.routeInfo = routeInfo;
        if(this.routeInfo){
          const { TEL } = this.routeInfo;
          const mobile = typeof TEL === 'string' ? TEL.replace(/[^0-9]/g,""): TEL;
          console.log("mobile and Tel", mobile, this.routeCodes[0].routeCode);
          this.firebaseService.getOrigin(mobile, this.routeCodes[0].routeCode);
          this.firebaseService.getDriverData(mobile, this.routeCodes[0].routeCode);
          this.firebaseService.getDriverDataOnChange(mobile, this.routeCodes[0].routeCode);
        }
        
        this.mapRouteSequence(routeSequence);
        this.allRoutesCustomerData = JSON.parse(JSON.stringify(customerData));
        const initialSelectedRoute = this.getSelectedRouteCustomerData([this.routeCodes[0]]);
        this.setCustomerTableData(initialSelectedRoute);
        this.setMapData(initialSelectedRoute);
        this.selectedRoute(this.allRouteCodes[0]);
        this.currentRoute = this.routeCodes[0].routeCode;
        this.selectedRouteData = this.routeCodes[0];
      })
  }
  
  timeDifference(route:CustomerData){
    if(!route.CHECKIN_TIME && !route.CHECKOUT_TIME){
      return;
    }
    // return parseInt(route.CHECKIN_TIME) - parseInt(route.CHECKOUT_TIME)
  }

  getSelectedRouteCustomerData(routes:routeData[]){
    let customerData:any[] = [];
    routes?.forEach(({routeCode},index)=>{
      customerData = customerData.concat(this.allRoutesCustomerData.filter(route=>route.ROUTE_CODE===routeCode))
    });
    return customerData;
  }

  setCustomerTableData(selectedRouteData:CustomerData[]){
    const customerData = selectedRouteData.map((route) => {
      return {
        liveStatus: route.ISDONE === "Y" ? 'Completed' : 'On Route',
        customerCode: route.CUST_CODE,
        customerName: route.CUST_NAME,
        scheduleAt: route.SCHEDULE_AT,
        checkIn: route.CHECKIN_TIME,
        checkOut: route.CHECKOUT_TIME,
        duration: this.timeDifference(route),
        location: route.LOCATION,
        delivery: route.DELIVERY_SCANNING,
        isCashCustomer:route.CASH_CUSTOMER,
        deliverySequence:route.DRIVERHASCHANGEDSEQUENCED==="N" ? route.DELIVERY_SEQ_DEFAULT : route.CUST_SEQ,
        branchName:route.CUST_BRANCH_NAME
      }
    });
    this.customerData.data = customerData;
  }

  setMapData(selectedRouteData:CustomerData[]){
    const formattedData = this.mapService.formatCustomerLatLon(selectedRouteData);
    this.allDestination = formattedData;
    const destinationInfo = this.mapService.getDestinations(formattedData);
    this.getDestinationsInfo(destinationInfo);
  }

  getDestinationsInfo(data:any) {
    const { error, reason, origin, destination, allPointsToCover, allLocations } = data;
    this.allLocations = allLocations;
    if (error === true) {
      // this.mapError = error;
      // this.mapErrorReason = reason;
    } else {
      // this.wayStopPointsArr.push(allPointsToCover);
      this.allMarker = [];
      this.allMarker.push(...allPointsToCover);
      this.fitAllMarker();
    }
  }
  fitAllMarker() {
    const data = this.allLocations;
    if (!data) return;
    const bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < data.length; i++) {
      bounds.extend(data[i]);
    }
    
      if (this.carMarkers&& this.carMarkers.getPosition()) {
        const pos = this.carMarkers.getPosition();
        if (pos) {
          bounds.extend({ lat: pos.lat(), lng: pos.lng() });
        }
      }
    
    this.myMap.googleMap.fitBounds(bounds, '5px')
  }
  selectedRoute(row:routeData){
    this.selection.toggle(row);
    if(this.selection.selected?.length === 0 || !this.selection.selected.includes(row)) {
    this.clearRouteDetailsData();
    return;
    }
    this.selectRouteForDetails(row);
  }

  clearRouteDetailsData(){
    this.customerData.data = [];
    this.mapRenderer?.setMap(null);
    this.carMarkers?.setMap(null);
    this.allMarker = [];
    this.routeSequence = {
      boxScanned:0,
      boxScanning:0,
      invoiceScanned:0,
      invoiceScanning:0,
      deliveryScanned:0,
      deliveryScanning:0
    };
    this.routeInfo.ROUTE_CODE = "";
    this.routeInfo.TEL = "";
    this.routeInfo.DELIVER_NAME = "";
    this.currentRoute = "";
    this.selectedRouteData = {
      routeCode:"",
      start:"",
      finish:"",
      issues:"",
      cust:0
    }
    return;
  }

  mapRouteSequence(routeSequence:IRouteSequence[]){
    const routeSequenceData = {
      boxScanned:0,
      boxScanning:0,
      invoiceScanned:0,
      invoiceScanning:0,
      deliveryScanned:0,
      deliveryScanning:0
    };
    routeSequence.forEach(sequence=>{
       if(sequence.TEXT === 'BOX_SCANNED') {
        routeSequenceData.boxScanned = sequence.TOTAL;
       }
       if(sequence.TEXT === 'TOTAL_BOX_SCANNING'){
         routeSequenceData.boxScanning = sequence.TOTAL;
       }
       if(sequence.TEXT === 'INVOICE_SCANNED'){
        routeSequenceData.invoiceScanned = sequence.TOTAL;
      }
      if(sequence.TEXT === 'TOTAL_INVOICE_SCANNING'){
        routeSequenceData.invoiceScanning = sequence.TOTAL;
      }
      if(sequence.TEXT === 'DELIVERY_SCANNED'){
        routeSequenceData.deliveryScanned = sequence.TOTAL;
      }
      if(sequence.TEXT === 'TOTAL_DELIVERY_SCANNING'){
        routeSequenceData.deliveryScanning = sequence.TOTAL;
      }
    });
    this.routeSequence = routeSequenceData;
  }

  selectRouteForDetails(route:routeData){
    this.currentRoute = route.routeCode;
    this.selectedRouteData = route;
    combineLatest([
      this.masterDataService.getCustomerData(this.customerDataParams(this.currentRoute)),
      this.masterDataService.getRouteInfo({
        ...this.constructRouteCode(this.currentRoute),
        ...this.formateDate()
       }),
      this.masterDataService.getRouteSequence({
        ...this.constructRouteCode(this.currentRoute),
        ...this.formateDate()
       })
     ]).pipe(take(1))
     .subscribe(([customerData,routeInfo,routeSequence]) => {
      if(customerData.length === 0){
        return;
      }
      if(!routeSequence){
        return;
      }
      this.routeInfo = routeInfo;
      if(this.routeInfo){
        const { TEL } = this.routeInfo;
        const mobile = typeof TEL === 'string' ? TEL.replace(/[^0-9]/g,""): TEL;
        console.log("mobile and Tel", mobile, this.currentRoute);
        this.firebaseService.getOrigin(mobile, this.currentRoute);
        this.firebaseService.getDriverData(mobile, this.currentRoute);
        this.firebaseService.getDriverDataOnChange(mobile, this.currentRoute);
      }
      this.isDriverLocationCreated = false;
      this.mapRouteSequence(routeSequence);
      this.allRoutesCustomerData = JSON.parse(JSON.stringify(customerData));
      const initialSelectedRoute = this.getSelectedRouteCustomerData([route]);
      this.setCustomerTableData(initialSelectedRoute);
      this.setMapData(initialSelectedRoute);
    });
  }

  getCurrentStatus(){
    if(!this.selectedRouteData) {
      return "";
    }
    const {start,finish} = this.selectedRouteData;
    if(start && finish){
      return start === "Y" && finish === "Y" ? "Completed" : "Yet to Deliver"
    }
    return "Yet to Deliver";
  }

  searchWithKeywords(){
    this.masterDataService.getCustomerData(this.customerDataParams(null)).subscribe((response)=>{
      this.setCustomerTableData(response);
    });
  }
  clearAll(){
    this.searchTerm = null;
    this.selection.clear();
    this.searchWithKeywords();
    this.clearRouteDetailsData();
  }

  ngOnDestroy(): void {
    if (this.directionSubscription) {
      this.directionSubscription.unsubscribe();
    }
    if (this.googlePolylineSubscription) {
      this.googlePolylineSubscription.unsubscribe();
    }
    if (this.mapDetailsSubscription) {
      this.mapDetailsSubscription.unsubscribe();
    }
    this.dateSelectionSub$.next(true);
    this.dateSelectionSub$.complete();
  }
  getRecord(row:any){
    this.showOverlay = true;
    this.proofDeliveryData = {...row} as any;
   
    const totalData = [] as any;
    this.masterDataService.getProofDelivery({
      ...this.formateDate(),
      route:this.currentRoute,
      customerCode:row.customerCode
    }).subscribe((response)=>{
      this.deliveryData = response;
      console.log(response);
      for(let i = 0;i<this.deliveryData.length;i++){
        const proofData = {
          boxes:[] as any,
          products:[] as any
        } as any;
        proofData.inVoiceNo = this.deliveryData[i].INV_NO;
        proofData.photo = this.deliveryData[i].PHOTO;
        proofData.audio = this.deliveryData[i].AUDIO as any;
        proofData.paymentSlip = this.deliveryData[i].PAYMENT_SLIP as  any;
        proofData.signature = this.deliveryData[i].SIGNATURE;
        proofData.completeInVoiceNo = this.deliveryData[i].INV_BOOK + this.deliveryData[i].INV_NO
        if(this.deliveryData[i].BOX_NO){
          proofData.boxes.push(this.deliveryData[i].BOX_NO)
        }
        proofData.products.push({
          productName:this.deliveryData[i].PRODUCT_NAME,
          productCode:this.deliveryData[i].PRODUCT_CODE,
          qty:this.deliveryData[i].QTY,
          rate:this.deliveryData[i].RATE,
          subTotal:this.deliveryData[i].SUB_TOTAL,
          unit:this.deliveryData[i].UNIT
        })
        proofData.total = this.deliveryData[i].SUB_TOTAL;
        for(let j = i+1;j<this.deliveryData.length;j++){
          if(proofData.inVoiceNo === this.deliveryData[j].INV_NO){
            if(this.deliveryData[j].BOX_NO){
              proofData.boxes.push(this.deliveryData[j].BOX_NO)
            }
            proofData.products.push({
              productName:this.deliveryData[j].PRODUCT_NAME,
              productCode:this.deliveryData[j].PRODUCT_CODE,
              qty:this.deliveryData[j].QTY,
              rate:this.deliveryData[j].RATE,
              subTotal:this.deliveryData[j].SUB_TOTAL,
              unit:this.deliveryData[j].UNIT
            })
            proofData.total += this.deliveryData[j].SUB_TOTAL;
            this.deliveryData.splice(j,1);
          }
        }
        totalData.push(proofData);
      }
      this.totalDeliveryBox = totalData;
      console.log(totalData);
      
    const overLayElement = this.el.nativeElement.querySelector("#overLay");
    const proofDeliveryBox = this.el.nativeElement.querySelector("#proofdeliveryBox");
    this.renderer.addClass(overLayElement, 'overlay-active');
    this.renderer.addClass(proofDeliveryBox,'proofdeliveryBox-active');  
    })
       
  }
  closeModal(){
    this.showOverlay = false;
    const overLayElement = this.el.nativeElement.querySelector("#overLay");
    const proofDeliveryBox = this.el.nativeElement.querySelector("#proofdeliveryBox");
    this.renderer.removeClass(overLayElement, 'overlay-active');
    this.renderer.removeClass(proofDeliveryBox,'proofdeliveryBox-active');       
  }
  searchForRoutes(event:any){
    console.log(event);
    this.routeData.data = this.allRouteCodes.filter(code=>{
      return code.routeCode.toLowerCase().includes(event.toLowerCase());
    });
  }
}
