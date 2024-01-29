import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/helpers/utils.service';
import { ILocationList } from '../master-setup/models/location.model';
import { MasterDataService } from '../master-setup/services/master-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private masterDataService: MasterDataService,
    private utilsService: UtilsService,
  ) { 
    this.setSideNavResponse();
  }
  screenWidth: number = 0;
  locationList: ILocationList[];
  selectedLocation = "";
  selectedDate = new Date();

  ngOnInit(): void {
  }
  tabs = [
    {
      tabName: "Over view",
      route: "/master-setup/control"
    },
    {
      tabName: "Route Details",
      route: "/master-setup/routes"
    },
    {
      tabName: "Complains",
      route: "/master-setup/complains"
    },
    {
      tabName: "Drivers",
      route: "/master-setup/drivers"
    }
  ];
  setSideNavResponse(): void {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
        this.screenWidth = window.innerWidth;
    };
}
onlogout() {
  localStorage.removeItem('STAFF_CODE');
  this.router.navigate(['/login']);
}
getLocationList() {
  this.masterDataService.getLocations({
    ...this.formateDate()
  }).subscribe(response => {
    this.locationList = response;
    this.selectedLocation = response[0].LOCATION_ID;
  })
}
formateDate() {
  return {
    docDate: this.utilsService.formattingDate(this.selectedDate)
  };
}

}
