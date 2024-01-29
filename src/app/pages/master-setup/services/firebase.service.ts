import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMapPoint } from '../models/map-point.model';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
const AppConstants = {
  warehouseLocation : {
      lat : 13.7154078,
      lng: 100.584779
  },
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private datePipe:DatePipe
  ) { 
    firebase.initializeApp(environment.firebaseLiveLocation);
  }
  addedNewLocation = new Subject();
  driversLocations = new Subject();
  googleOriginPoint = new Subject<IMapPoint>();
  getOrigin(mobile:any, routeCode:any) {
    const itemRef = `locationTrackingInterval-` + this.datePipe.transform(new Date(), 'yyyyMMdd') + mobile + routeCode + "start";
    const collectionRef = firebase.database().ref(itemRef);
    collectionRef
    .once('value', (snapshot: { val: () => any; }) => {
        const data = snapshot.val();
        const originLocation = data || AppConstants.warehouseLocation;
        this.googleOriginPoint.next(originLocation);
    });
}
getDriverData(mobile: string, routeCode: string, defaultDate?: Date) {
  const theDate = defaultDate || new Date();
  const itemRef = `locationTrackingInterval-` + this.datePipe.transform(theDate, 'yyyyMMdd') + mobile + routeCode;
  console.log("got total data from firebase", itemRef);

  const collectionRef = firebase.database().ref(itemRef);
  collectionRef
  .once('value', (snapshot: { val: () => any; }) => {
      const data = snapshot.val();
      console.log("firebase all data", data);
      this.driversLocations.next(data);
  });
}
getDriverDataOnChange(mobile: string, routeCode: string, defaultDate?: Date) {
  const theDate = defaultDate || new Date();
  const itemRef = `locationTrackingInterval-` + this.datePipe.transform(theDate, 'yyyyMMdd') + mobile + routeCode;
  console.log("got data from firebase", itemRef);
  const collectionRef = firebase.database().ref(itemRef);
  collectionRef
  .limitToLast(1)
  .on('child_added', (snapshot: { val: () => any; }) => {
      const data = snapshot.val();
      console.log("firebase new child add", data);
      this.addedNewLocation.next(data);
  });
}
}
