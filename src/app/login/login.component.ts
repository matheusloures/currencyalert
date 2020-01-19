import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  constructor(private auth: AuthService, private router: Router, private as: AlertService, private formBuilder: FormBuilder) {this.createForm(); }

  ngOnInit() {
  }
  goToManager(){
    // console.log('clicked');
    this.router.navigate(['/manager'])
  }
  onClickSubmit(data) {

    // console.log(data);
    this.auth.doLogin(data.email, data.password).subscribe(res=>{
      // console.log('login',res)
      if(res.success===true){
        localStorage.setItem('token', res.token);
        this.router.navigate(['/manager'])
        this.auth.logged=true;
      }else{
        this.router.navigate(['/'])
        this.auth.logged=false;
      }
    })
    // this.as.addNewAlert(data.email, data.valor, data.moeda, data.valorunitario).subscribe(res=>{
    //   // console.log('resposta do servidor:', res);
    //   if(res.success===true){
    //     // this.alerts.setMessage('ALerta criado com sucesso!','success');
    //     this.alertform.reset()
    //     this.successMsg= res.msg;
    //   }else if(res.success===false){
    //     // this.alerts.setMessage('Apenas 1 alerta por e-mail!','warn');
    //     this.alertform.reset()
    //     this.errorMsg= res.msg;
    //   }
    // });
    // alert('Entered Email id : ' + data);
 }

  createForm() {
    this.loginform = this.formBuilder.group({
      email:
        [
          [''],
              Validators.compose(
                [
                  Validators.required,
                  Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                  Validators.minLength(5),
                  Validators.maxLength(40)
                ]
              )],
      password:
        [
          ['']
        ]

    });

  }

}
