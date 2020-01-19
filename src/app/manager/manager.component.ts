import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  logged;
  alertas;
  constructor(private as: AlertService, private router: Router, public auth: AuthService) {
    this.as.pegarAlertas().subscribe(res=>{
      // console.log('alertas',res)
      this.alertas = res;
    })
   }



  ngOnInit() {
  }
  goToLogin(){
    this.router.navigate(['/login'])
  }
  logout(){
    this.router.navigate(['/'])
    localStorage.clear();
    this.auth.logged=false;
  }
}
