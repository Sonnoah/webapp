import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { AccountService } from './_services/account.service';
import { count } from 'rxjs';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hi';
  faBell = faBell

  users: any

  constructor(private http: HttpClient, private accountService: AccountService) { }

  setCurrentUser(){
    const userString = localStorage.getItem('user')
    if (userString === null) return
    const user:User = JSON.parse(userString)
    this.accountService.setCurrentUser(user)
  }
  

  ngOnInit(): void {
    //this.getUser();
    this.setCurrentUser()
  }

  //private getUser() {
   // this.http.get('https://localhost:7777/api/users').subscribe({
   //   next: (response) => this.users = response,
    //  error: (err) => console.log(err),
     // complete: () => console.log('request completed')
  //  });
 // }

}
