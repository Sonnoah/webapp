import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  @Output() isCancel = new EventEmitter()  
  
  constructor(private toastr: ToastrService,private accountService : AccountService){}
  model: any = {}


  register() {
    this.accountService.register(this.model).subscribe(
      {
        error : err => this.toastr.error(err),
        next : () => this.cancel()

      })
  }

  cancel() {
    this.isCancel.emit(true)
  }
}
