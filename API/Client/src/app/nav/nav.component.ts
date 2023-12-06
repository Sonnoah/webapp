import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    model: any = {}
    currentUser$: Observable<User | null> = of(null) 

    constructor(private toastr: ToastrService,private router : Router,private accountService: AccountService) {}
    ngOnInit(): void {
        this.currentUser$ = this.accountService.currentUser$
    }


  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
        next: user => console.log(user),
        error: err => console.log(err)
    })
}

  login(): void {
      this.accountService.login(this.model).subscribe({ 
          next: () => {
              this.router.navigateByUrl('menbers')
          },
          error: err => this.toastr.error(err.error)
      })
  }
  logout() {
    this.accountService.logout()
}
}