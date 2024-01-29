import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICount } from '../models/count.model';
import { CustomerData } from '../models/customer-data.model';
import { ICustomerStatus } from '../models/customer-status.model';
import { IDriverList } from '../models/driver-list.model';
import { ILocationList } from '../models/location.model';
import { IRouteCode } from '../models/route-code.model';
import { IRouteInfo } from '../models/route-info.model';
import { IRouteSequence } from '../models/route-sequence.model';


@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(
    private http:HttpClient
  ) { }
  private API_URL = environment.apiUrl;
  dateSelection = new BehaviorSubject(new Date());
  
  getCustomerData(params:any):Observable<CustomerData[]>{
    //route=${routeCodes}&keyword=${searchTerm || null}
    const url = `${this.API_URL}/logilite/customer`;
    return this.http.get<CustomerData[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }
  getCustomerGPSData(params:any):Observable<CustomerData[]>{
    //route=${routeCodes}&keyword=${searchTerm || null}
    const url = `${this.API_URL}/logilite/customer-gps`;
    return this.http.get<CustomerData[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }
  getRouteData(params:any):Observable<IRouteCode[]>{
   const url = `${this.API_URL}/logilite/routes`;
    return this.http.get<IRouteCode[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }

  getRouteInfo(params:any):Observable<IRouteInfo>{
    //route=${routeCode}
    const url = `${this.API_URL}/logilite/route-info`;
    return this.http.get<IRouteInfo>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data[0];
      })
    )
  }
  getRouteSequence(params:any):Observable<IRouteSequence[]>{
    const url = `${this.API_URL}/logilite/route-sequencing`;
    return this.http.get<IRouteSequence[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }

  getLocations(params:any):Observable<ILocationList[]>{
    const url = `${this.API_URL}/logilite/location`;
    return this.http.get<ILocationList[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }
  getCounts(params:any):Observable<ICount[]>{
    const url = `${this.API_URL}/logilite/counts`;
    return this.http.get<ICount[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }
  getProofDelivery(params:any):Observable<any[]>{
    const url = `${this.API_URL}/logilite/attachments`;
    return this.http.get<any[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }
  getRouteDriverCount(params:any):Observable<any[]>{
    const url = `${this.API_URL}/logilite/route-driver-count`;
    return this.http.get<any[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }
  getDriverList(params:any):Observable<any[]>{
    const url = `${this.API_URL}/logilite/driver-list`;
    return this.http.get<IDriverList[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }
  getCheckInCustomer(params:any):Observable<any[]>{
    const url = `${this.API_URL}/logilite/checkin-customer`;
    return this.http.get<ICustomerStatus[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }
  getCheckOutCustomer(params:any):Observable<any[]>{
    const url = `${this.API_URL}/logilite/checkout-customer`;
    return this.http.get<ICustomerStatus[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }
  getCashCustomer(params:any):Observable<any[]>{
    const url = `${this.API_URL}/logilite/cash-customer`;
    return this.http.get<ICustomerStatus[]>(url,{
      params:this.constructParams(params)
    }).pipe(
      map((response:any)=>{
        return response.data;
      })
    )
  }
  constructParams(params:any){
    const defaultParams = {
      company:"JB",
      userCode:"JBT04",
      location:0,
      docDate:"20220209"
    }
    const urlParams = {...defaultParams,...params};
    return new HttpParams({fromObject:urlParams});
  }


}
