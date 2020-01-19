import { Http, Headers, RequestOptions } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public http: Http) { }

  addNewAlert(email, valor, moeda, valorunitario) {

    const token = localStorage.getItem('__xt');
    // console.log(token);
  // console.log(extractedToken);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');


    const obj = {
      email: email,
      valor: valor,
      moeda: moeda,
      valorunitario: valorunitario,

    };
    // console.log(obj);
    const options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
    return this.http.post('http://ec2-18-217-36-199.us-east-2.compute.amazonaws.com:5000/alerta', obj, options)
    // return this.http.post('http://ec2-18-217-36-199.us-east-2.compute.amazonaws.com:5000/alerta', obj, options)
    .pipe(map((response: any) => response.json()));

}
pegarPrecoHoje(moeda, valor) {


  const headers = new Headers();
  headers.append('Content-Type', 'application/json');


  const obj = {
    valor: valor,
    moeda: moeda,

  };
  // console.log(obj);
  const options = new RequestOptions( {method: RequestMethod.Post, headers: headers });
  return this.http.post('http://ec2-18-217-36-199.us-east-2.compute.amazonaws.com:5000/precohoje', obj, options)
  // return this.http.post('http://ec2-18-217-36-199.us-east-2.compute.amazonaws.com:5000/precohoje', obj, options)
  .pipe(map((response: any) => response.json()));

}
pegarAlertas() {


  const headers = new Headers();
  headers.append('Content-Type', 'application/json');


  const options = new RequestOptions( {method: RequestMethod.Get, headers: headers });
  return this.http.get('http://ec2-18-217-36-199.us-east-2.compute.amazonaws.com:5000/alertas', options)
  // return this.http.post('http://ec2-18-217-36-199.us-east-2.compute.amazonaws.com:5000/precohoje', obj, options)
  .pipe(map((response: any) => response.json()));

}

}
