import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/helpers/utils.service';

import { environment } from 'src/environments/environment';
import { IMapPoint } from '../models/map-point.model';
declare const google: any;
interface ILatLngDestination {
    lat: number;
    lng: number;
    name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
    directionsService:any;
    driverNotFoundSubscription = new Subject();
    googleDirection = new Subject<any>();
    fitMapMarker = new Subject();
    googleDirectionDetails = new Subject<any>();
    getPolylineData = new Subject<google.maps.Polyline>();

  constructor(
    // private utilsService:UtilsService
  ) { 
    this.directionsService = new google.maps.DirectionsService();
  }
  driverNotFound() {
    this.driverNotFoundSubscription.next(true);
}
getDestinations(destinations: ILatLngDestination[] | any[], originPoint?: IMapPoint) {
    const no_of_destinations = destinations.length;
    if (destinations.length === 0) {
        return { error: true, reason: 'At least location two point required'};
    }
    const origin = originPoint || destinations[0];
    const allLocations: any[] = [];
    const destination = destinations[no_of_destinations - 1];
    const waypoints = destinations.map((item, index) => {
        allLocations.push({ lat: item.lat, lng: item.lng });
        return {
            ...item,
            location: { lat: item.lat, lng: item.lng },
            stopover: ((index === 0) || (index === no_of_destinations - 1)) ? false : true,
        };
    });
    this.getGoogleDirection(origin, destination, waypoints);
    return {error: false, allLocations, origin, destination, allPointsToCover: waypoints};
}
getGoogleDirection(origin: any, destination: any, waypoints: any[]) {
  const request: google.maps.DirectionsRequest = {
      destination,
      origin,
      waypoints: waypoints.map((item: { location: any; stopover: any; }) => {
          return {
              location: item.location,
              stopover: item.stopover,
          };
      }),
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
  };
  this.directionsService.route(request, (response: google.maps.DirectionsResult, status:any) => {
      if (status === google.maps.DirectionsStatus.OK) {
          this.googleDirection.next(response);
      }
  });
}

saveRouteInfo(data: any) {
  const polyline = new google.maps.Polyline({
      path: [],
  });
  const legs = data.routes[0].legs;
  let totalDistance = 0;
  let totalDuration = 0;
  const detailsArr = [] as any;
  for (let i = 0; i < legs.length; i++) {
      totalDistance += legs[i].distance.value;
      totalDuration += legs[i].duration.value;
      detailsArr.push({
          start_address: legs[i].start_address,
          end_address: legs[i].end_address,
          distance: legs[i].distance.text,
          duration: legs[i].duration.text,
      });
      // Get data in polyline
      const steps = legs[i].steps;
      for (let j = 0; j < steps.length; j++) {
          const nextSegment = steps[j].path;
          for (let k = 0; k < nextSegment.length; k++) {
              polyline.getPath().push(nextSegment[k]);
          }
      }
  }
  this.getPolylineData.next(polyline);
  const googleEstimation = {
      totalDistance: (totalDistance / 1000) + ' km',
      totalDuration: this.secondsToHms(totalDuration),
      detailsArr,
  };
  this.googleDirectionDetails.next(googleEstimation);
}
secondsToHms(d:any) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
};
formatCustomerLatLon(locations:any[]) {
  return locations.filter((item) => item.LATITUDE && (Number(item.LATITUDE) !== 0))
                  .map((item) => {
      return {
          lat: typeof item.LATITUDE === 'string' ? Number(item.LATITUDE) : item.LATITUDE,
          lng: typeof item.LONGITUDE === 'string' ? Number(item.LONGITUDE) : item.LONGITUDE,
          customerCode: item?.CUST_CODE,
          invoiceNo: item?.INV_NO,
          deliveryTo: item?.DELIVERY_TO,
          customerBranchSeq: item?.CUST_BRANCH_SEQ,
          signature: item?.SIGNATURE,
          alreadyCheckout: !!item.SIGNATURE,
          isDone:item.ISDONE
      }
  });
}
}
