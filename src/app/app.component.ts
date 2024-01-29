import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocationList } from './pages/master-setup/models/location.model';
import { LoaderService } from './shared/services/loader/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
   

    constructor(
        private loaderService:LoaderService
    ) {
    }
    isLoading:Observable<boolean>;

    ngOnInit(): void {
        this.isLoading = this.loaderService.isLoading;
       
    }

}
