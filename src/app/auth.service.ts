import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  talogado:boolean;
  constructor(private router: Router,public http: Http) {
    this.talogado=false;
   }
  doLogin(email, pass) {


    const headers = new Headers();
    headers.append('Content-Type', 'application/json');


    const obj = {
      email: email,
      password: pass,

    };
    const options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
    return this.http.post('http://ec2-18-217-36-199.us-east-2.compute.amazonaws.com:5000/login', obj, options)
    // return this.http.post('http://ec2-18-217-36-199.us-east-2.compute.amazonaws.com:5000/precohoje', obj, options)
    .pipe(map((response: any) => response.json()));

  }
  isLogged(){
    const token = localStorage.getItem('token');
    if(token){
      this.talogado=true;
    }else{
      this.talogado=false
    }
  }

  get logged(){
    const token = localStorage.getItem('token');
    // console.log(token)
    if(token){
    // console.log('on')

      return true;
    }else{
    // console.log('off')

      return false;
    }

  }
  set logged(val){
    this.talogado=val;
  }
}
