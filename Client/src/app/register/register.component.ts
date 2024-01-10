import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  registerForm: FormGroup = new FormGroup({})
  @Output() isCancel = new EventEmitter()  
  
  constructor(private toastr: ToastrService,private accountService : AccountService){}
  ngOnInit(): void {
    this.initForm()
  }
  model: any = {}

  initForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required, this.matchValue('password')]),
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: _ => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValue(matchTo: string): ValidatorFn {
    return (ctrl: AbstractControl) =>
      ctrl.value === ctrl.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true }
  }

  register() {
    // this.accountService.register(this.model).subscribe({ ... })
    console.log(this.registerForm?.value)
  }

  // register() {
  //   this.accountService.register(this.model).subscribe(
  //     {
  //       error : err => this.toastr.error(err),
  //       next : () => this.cancel()

  //     })
  // }

  cancel() {
    this.isCancel.emit(true)
  }
}
