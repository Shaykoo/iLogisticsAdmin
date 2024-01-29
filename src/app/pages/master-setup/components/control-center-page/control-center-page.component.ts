import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MasterDataService } from '../../services/master-data.service';
import { UtilsService } from '../../../../shared/helpers/utils.service';
import { combineLatest, EMPTY, Subscription, switchMap, tap } from 'rxjs';
import { ICount } from '../../models/count.model';
import { IRouteCode } from '../../models/route-code.model';
import { CustomerData } from '../../models/customer-data.model';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ICustomerStatus } from '../../models/customer-status.model';

@Component({
    selector: 'app-control-center-page',
    templateUrl: './control-center-page.component.html',
    styleUrls: ['./control-center-page.component.scss'],
})
export class ControlCenterPageComponent implements OnInit,AfterViewInit,OnDestroy {
    lat: number = 13.736717;
    lng: number = 100.523186;
    routeCodesList: any[];
    copyRouteCodesList:any[];

    constructor(
        private masterDataService:MasterDataService,
        private utilsService:UtilsService
    ) {}
    selectedDate = new Date();
    countsData:ICount[];
    allRoutesCustomerData:CustomerData[];
    allMarkers:CustomerData[];
    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
    selectedMarkerCustomer: string;
    selectedMarkerDelivery: string;
    @ViewChild('map', { static: false }) myMap:any;
    statuses = ["All","Pending","Cash","Complete","Issue"];
    selectedStatus = this.statuses[0];
    dateSelectionSub$:Subscription;
    selectedRoutes:string[] = [];

    ngOnInit(): void {
        this.dateSelectionSub$ = this.masterDataService.dateSelection.subscribe((selectedDate)=>{
            this.selectedDate = selectedDate as any;
            this.fetchOverviewData();
        })
    }
    ngAfterViewInit(){
       const position = new google.maps.LatLng({ lat: +this.lat, lng: +this.lng })
       this.myMap.googleMap.setCenter(position);
    }
    formateDate(){
        return {
          docDate:this.utilsService.formattingDate(this.selectedDate)
        };
    }
    customerDataParams(routes:IRouteCode[]){
        const routeCodes = routes.map(routeCode=>{
            return {
                ROUTE_CODE:routeCode.ROUTE_CODE
            }
        }).map(routeCode=>Object.values(routeCode)).join(",");
        this.selectedRoutes = this.selectedRoutes?.concat(routeCodes.split(","));
        return {
          route:routeCodes,
          ...this.formateDate()
        }
     }
   
    fetchOverviewData(){
       this.masterDataService.getRouteData({
                ...this.formateDate()
        })
        .pipe(
            tap((response)=>{
                this.routeCodesList = response;
                this.copyRouteCodesList = JSON.parse(JSON.stringify(response));
            }),
            switchMap((response)=>{
                if(response.length === 0){
                    return EMPTY;
                }
                return combineLatest([
                    this.masterDataService.getCustomerGPSData(this.customerDataParams(response.slice(0,5))),
                    this.masterDataService.getCounts({
                        ...this.formateDate()
                    })
                ])
            })
        ).subscribe(([customerData,countsData])=>{
            if(customerData.length === 0){
                return;
            }
            this.countsData = countsData;
            this.allRoutesCustomerData = customerData;
            this.generateMarkers(this.allRoutesCustomerData);
        });
    }
   
    getHeaderCountByText(textName:string){
       return (this.countsData?.filter(m=>m.TEXT==textName)[0])?.TOTAL || 0;
    }

    generateMarkers(customerData:CustomerData[]){
        let allMarkers:CustomerData[] = [];
        this.routeCodesList.forEach(code=>{
            let filterRouteData = customerData.filter((route:CustomerData)=>route.ROUTE_CODE === code.ROUTE_CODE);
            const color = this.getRandomColor();
            console.log("color",color);
            if(!code.color) {
                code.color = color;
            }
           
            const routeData = filterRouteData.map((route,index)=>{
                if(!route.color) {
                  route.color = this.routeCodesList.find(routeCode=>routeCode.ROUTE_CODE===route.ROUTE_CODE)?.color;
                }
                route.lat = route.LATITUDE;
                route.lng = route.LONGITUDE;
                return route;
            });
            allMarkers = allMarkers.concat(routeData);
        });
        this.allMarkers = allMarkers;
        const position = new google.maps.LatLng({ lat: +allMarkers[0]?.lat!, lng: +allMarkers[0]?.lng! })
        this.myMap.googleMap.setCenter(position);
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    getMarkerStyle = (markerObj: any, i: number) => {
        return {
            icon:{
                path:"M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
                fillColor: markerObj.color,
                fillOpacity: 1.0,
                strokeWeight: 1,
                scale: 2,
               
            }
        }
      }

      openInfoWindow(markerMap: MapMarker, markerInfo: { CUST_CODE: string; CUST_NAME: string; }) {
        this.infoWindow.open(markerMap);
        this.selectedMarkerCustomer = markerInfo.CUST_CODE;
        this.selectedMarkerDelivery = markerInfo.CUST_NAME;
      }

      selectStatus(status:string){
          console.log(status);
          this.selectedStatus = status;
          switch(status) {
              case "All": {
                this.fetchOverviewData();
                break;
              }
              case "Cash":{
                this.fetchAllCashCustomer();
                break;
              }
              case "Pending":{
                this.fetchAllCheckInCustomer();
                break;
              }
              case "Complete":{
                this.fetchAllCheckOutCustomer();
                break;
              }
              default:
                break;
          }
    }
    fetchAllCheckInCustomer(){
        this.masterDataService.getCheckInCustomer(this.formateDate()).subscribe((response)=>{
            this.updateRouteCodeList(response);
            this.selectedRoutes = this.routeCodesList.slice(0,5).map(code=>code.ROUTE_CODE);
            this.getAllCustomers()
        })
    }
    fetchAllCheckOutCustomer(){
        this.masterDataService.getCheckOutCustomer(this.formateDate()).subscribe((response)=>{
            this.updateRouteCodeList(response);
            this.selectedRoutes = this.routeCodesList.slice(0,5).map(code=>code.ROUTE_CODE);
            this.getAllCustomers()
        })
    }
    fetchAllCashCustomer(){
        this.masterDataService.getCashCustomer(this.formateDate()).subscribe((response)=>{
            this.updateRouteCodeList(response);
            this.selectedRoutes = this.routeCodesList.slice(0,5).map(code=>code.ROUTE_CODE);
            this.getAllCustomers()
        })
    }

    getAllCustomers(){
        const routeList = this.routeCodesList.filter(routeCode=>this.selectedRoutes.includes(routeCode.ROUTE_CODE));
        this.masterDataService.getCustomerGPSData(this.customerDataParams(routeList)).subscribe(customerData=>{
            this.allRoutesCustomerData = customerData;
            this.generateMarkers(this.allRoutesCustomerData);
        });
    }


    ngOnDestroy(): void {
        this.dateSelectionSub$?.unsubscribe();
    }
    showSelectedRoute(routeCode:IRouteCode){
        if(this.selectedRoutes.includes(routeCode.ROUTE_CODE)) {
            return;
        }
        this.selectedRoutes.push(routeCode.ROUTE_CODE);
        const routeList = this.routeCodesList.find(route=>route.ROUTE_CODE===routeCode.ROUTE_CODE);
        this.masterDataService.getCustomerGPSData(this.customerDataParams([routeList])).subscribe(customerData=>{
            this.allRoutesCustomerData = this.allRoutesCustomerData.concat(customerData);
            this.generateMarkers(this.allRoutesCustomerData);
        });
    }

    updateRouteCodeList(customerData:CustomerData[]){
        const routeCodes = customerData.map(customer=>{
            return {
                ROUTE_CODE:customer.ROUTE_CODE,
                color:this.copyRouteCodesList.find(routeCode=>routeCode.ROUTE_CODE===customer.ROUTE_CODE)?.color
            }
        });
        this.routeCodesList = this.getUniqueListBy(routeCodes,"ROUTE_CODE");
    }
    getUniqueListBy(arr:any[], key:string) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }
}
