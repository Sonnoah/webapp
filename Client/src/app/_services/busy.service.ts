import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  count = 0;
  constructor(private spinnerService: NgxSpinnerService) { }

  busy(name?: string | undefined) {
    this.count++
    this.spinnerService.show(name, {
      type: 'square-spin',
      bdColor: 'rgba(255,255,255,0)',
      color: '#E95420'
    })
  }

  idle(name?: string | undefined) {
    this.count--
    if (this.count <= 0) {
      this.count = 0
      this.spinnerService.hide(name)
    }
  }
}
