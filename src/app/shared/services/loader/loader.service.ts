import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();
  locked: boolean;
  pendingReq = 0;

  show() {
    this.pendingReq = this.pendingReq + 1;
    if (!this.locked) {
      this.locked = true;
      this.isLoading.next(true);
    }
  }

  hide() {
    this.pendingReq = this.pendingReq - 1;
    if (this.pendingReq === 0) {
      this.locked = false;
      this.isLoading.next(false);
    }
  }
}
