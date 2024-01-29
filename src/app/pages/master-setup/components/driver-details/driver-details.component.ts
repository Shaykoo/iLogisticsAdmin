import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from '../../../../shared/helpers/utils.service';
import { CustomerData } from '../../models/customer-data.model';
import { IDriverList } from '../../models/driver-list.model';
import { FirebaseService } from '../../services/firebase.service';
import { MapService } from '../../services/map.service';
import { MasterDataService } from '../../services/master-data.service';
import { environment } from '../../../../../environments/environment';
import { MatSort } from '@angular/material/sort';

export interface DriverList {
  name: string;
  phoneNumber: string;
  routeCode: string;
  routePlanning?: string;
  invoceScan?: string;
  documentScan?: string;
  delivery?: string;
  tracking?: string;
  report?: string; 
  otp?:string;
}
export const car = 'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z';
@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})

export class DriverDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phoneNumber', 'routeCode','otp','routePlanning','invoiceScan','documentScan','delivery','tracking','report'];
  dataSource = new MatTableDataSource<DriverList>();
  showrightMap = false;
  constructor(
    private masterDataService:MasterDataService,
    private utilService:UtilsService,
    private mapService: MapService,
    private firebaseService: FirebaseService,
  ) { }

  dateSelectionSub$ = new Subject();
  selectedDate = new Date();
  totalDriver = 0;
  totalRoute = 0;
  customerCount = 0;
  customerList:number[] = [];
  customerData:CustomerData[];
  currentCustomer:any;
  currentIndex = 0;
  selectedRow:DriverList;
  @ViewChild('map', { static: false }) myMap:any;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  lat: number = 13.736717;
  lng: number = 100.523186;
  public allMarker: any[] = [];
  selectedMarkerCustomer: string;
  selectedMarkerDelivery: string;
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
  carMarkers: { [key: string]: google.maps.Marker} = {};
  allDestination: any[] = [];
  allLocations = [];
  polylineForData: google.maps.Polyline;
  mapRenderer:any;

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
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
    });
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
      this.mapService.getPolylineData.pipe(takeUntil(this.dateSelectionSub$))
      .subscribe((polyline: google.maps.Polyline) => {
        this.polylineForData = polyline;
      });
      this.mapService.googleDirection.pipe(takeUntil(this.dateSelectionSub$))
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
    this.masterDataService.dateSelection.pipe(takeUntil(this.dateSelectionSub$)).subscribe((selectedDate)=>{
      this.selectedDate = selectedDate as any;
      this.fetchRouteDriverCount();
      this.fetchDriverList();
    
    });
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
      // if (this.isDriverLocationCreated === false) {
      //   this.createDriverLocation(lat, long, uKey);
      // } else {
      //   this.updateDriverLocation(lat, long, uKey);
      // }
      if (!this.carMarkers[uKey]) {
        this.createDriverLocation(lat, long, uKey);
      } else {
        this.updateDriverLocation(lat, long, uKey);
      }
    }
  }
  updateDriverLocation(latitude: number, longitude: string | number, uKey: string) {
    const lastPosn = this.carMarkers[uKey].getPosition();
    const position = new google.maps.LatLng({ lat: +latitude, lng: +longitude });
    this.carMarkers[uKey].setPosition(position);
    if (!!lastPosn) {
      const heading = google.maps.geometry.spherical.computeHeading(lastPosn, position);
      this.carIcon.rotation = heading;
      this.carMarkers[uKey].setIcon(this.carIcon);
    }
    
  }
  
  createDriverLocation(latitude: number, longitude: string | number, uKey: string) {
    
    const position = new google.maps.LatLng({ lat: +latitude, lng: +longitude });
    this.myMap.googleMap.setCenter(position);
    this.carMarkers[uKey] = new google.maps.Marker({
      icon: this.carIcon,
      map: this.myMap.googleMap,
      position,
    });
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
      ...this.formateDate()
    }
 }
  fetchRouteDriverCount(){
    this.masterDataService.getRouteDriverCount(this.formateDate()).subscribe((response)=>{
      if(response?.length > 0) {
         response.forEach(count=>{
           if(count.LABEL === "TOTAL_DRIVER") {
             this.totalDriver = count.COUNT_TOTAL
           }
           if(count.LABEL === "TOTAL_ROUTE") {
             this.totalRoute = count.COUNT_TOTAL;
           }
         })
      }
    })
  }
  fetchDriverList(){
    this.masterDataService.getDriverList(this.formateDate()).subscribe((response:IDriverList[])=>{
       if(response?.length >0){
          let dataDriver = response.map((driver)=>{
           return {
             name:driver.DELIVER_NAME,
             phoneNumber:driver.TEL,
             routeCode:driver.ROUTE_CODE,
             routePlanning:driver.ROUTE_PLANNING,
             invoiceScan:driver.INVOICE_SCANNED,
             delivery:driver.DELIVERY,
             otp:driver.OTP_NUMBER
           }
         })  
         const data = JSON.parse(JSON.stringify(dataDriver));
         this.dataSource = new MatTableDataSource(data);
         this.dataSource.sort = this.sort;
       }
    })
  }
  getMap(row:any){
    this.showrightMap = true;
    this.getCustomerList(row);
  }
  closeMap(){
    this.showrightMap = false;
  }

  getCustomerList(row:any){
    this.selectedRow = row;
    this.masterDataService.getCustomerData(this.customerDataParams(row?.routeCode)).subscribe((customerList)=>{
      this.customerList = Array(customerList.length).fill(undefined).map((x,i)=>i+1);
      this.customerData = customerList;
      this.setMapData();
      this.currentCustomer = customerList[0];
      this.firebaseService.getOrigin(this.selectedRow.phoneNumber, row.routeCode);
      this.firebaseService.getDriverData(this.selectedRow.phoneNumber, row.routeCode);
      this.firebaseService.getDriverDataOnChange(this.selectedRow.phoneNumber, row.routeCode);
      this.currentIndex = 0;
    })
  }
  setMapData(){
    const formattedData = this.mapService.formatCustomerLatLon(this.customerData);
    this.allDestination = formattedData;
    const destinationInfo = this.mapService.getDestinations(formattedData);
    this.getDestinationsInfo(destinationInfo);
    this.allMarker = formattedData;
    // if(this.allMarker.length >0){
    //   setTimeout(()=>{
    //     const position = new google.maps.LatLng({ lat: +this.allMarker[0].lat, lng: +this.allMarker[0].lng })
    //     this.myMap.googleMap.setCenter(position);
    //   },100)
    // } 
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
    for (const markerItem in this.carMarkers) {
      if (this.carMarkers[markerItem] && this.carMarkers[markerItem].getPosition()) {
        const pos = this.carMarkers[markerItem].getPosition();
        if (pos) {
          bounds.extend({ lat: pos.lat(), lng: pos.lng() });
        }
      }
    }
    this.myMap.googleMap.fitBounds(bounds, '5px')
  }
  selectCustomerData(index:number){
    this.currentIndex = index;
    this.currentCustomer = this.customerData[index];
  }
  getMarkerStyle = (markerObj: any, i: number) => {
    return {
      icon:{
        path: 'm 12,2.4000002 c -2.7802903,0 -5.9650002,1.5099999 -5.9650002,5.8299998 0,1.74375 1.1549213,3.264465 2.3551945,4.025812 1.2002732,0.761348 2.4458987,0.763328 2.6273057,2.474813 L 12,24 12.9825,14.68 c 0.179732,-1.704939 1.425357,-1.665423 2.626049,-2.424188 C 16.809241,11.497047 17.965,9.94 17.965,8.23 17.965,3.9100001 14.78029,2.4000002 12,2.4000002 Z',
        fillColor: markerObj.alreadyCheckout ? '#56C36F' : '#E5E5E8',
        fillOpacity: 1.0,
        strokeColor: '#000000',
        strokeWeight: 1,
        scale: 2,
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
}
