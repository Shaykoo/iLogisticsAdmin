import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/helpers/utils.service';
import { ILocationList } from './models/location.model';
import { MasterDataService } from './services/master-data.service';

@Component({
  selector: 'app-master-setup',
  templateUrl: './master-setup.component.html',
  styleUrls: ['./master-setup.component.scss']
})
export class MasterSetupComponent implements OnInit {
  screenWidth: number = 0;
  constructor(
    private masterDataService: MasterDataService,
    private utilsService: UtilsService,
    private router: Router,
  ) {
    this.setSideNavResponse();
  }
  selectedDate = new Date();
  locationList: ILocationList[];
  selectedLocation = "";
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

  ngOnInit(): void {
    this.getLocationList();
  }
  setSideNavResponse(): void {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
        this.screenWidth = window.innerWidth;
    };
}
  onDateChange() {
    this.masterDataService.dateSelection.next(this.selectedDate);
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
  onlogout() {
    localStorage.removeItem('STAFF_CODE');
    this.router.navigate(['/login']);
  }

}
