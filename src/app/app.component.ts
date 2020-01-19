import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from './alert.service';
// import { AlertsService } from 'angular-alert-module';
import {Router} from '@angular/router';
import {MatListModule} from '@angular/material/list';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alertform: FormGroup;
  title = 'app';
  isReadyToSave;
  successMsg;
  errorMsg;
  moedaChosen;
  valorChosen;
  precoHoje;
  valorIof;
  valorSemIof;
  basecambio;
  constructor(private router: Router, private as: AlertService, private formBuilder: FormBuilder) {


    this.createForm();
    this.alertform.valueChanges.subscribe((v) => {
      // console.log('value', v);
      this.errorMsg= false;
      this.successMsg= false;
      if (this.alertform.valid) {
        this.isReadyToSave = true;
        this.errorMsg= false;
        this.successMsg= false;
      } else {
        this.isReadyToSave = false;

      }

    });
  }
  goToManager(){
    // console.log('clicked');
    this.router.navigate(['/manager'])
  }
  selectChange(v){
    // console.log(v);
    this.moedaChosen=false;
    this.valorChosen=false;
    this.precoHoje=false;
  }
  checkTodaysPrice(moeda, valor){

    this.as.pegarPrecoHoje(moeda, valor).subscribe(res=>{
      // console.log('pegouu',res);
      this.basecambio=res['basecambio']
      this.precoHoje=res['total'];
      this.valorIof=res['iof'];
      this.valorSemIof =res['valor'];
    })

  }
  onClickSubmit(data) {
    this.as.addNewAlert(data.email, data.valor, data.moeda, data.valorunitario).subscribe(res=>{
      // console.log('resposta do servidor:', res);
      if(res.success===true){
        // this.alerts.setMessage('ALerta criado com sucesso!','success');
        this.alertform.reset()
        this.successMsg= res.msg;
      }else if(res.success===false){
        // this.alerts.setMessage('Apenas 1 alerta por e-mail!','warn');
        this.alertform.reset()
        this.errorMsg= res.msg;
      }
    });
    // alert('Entered Email id : ' + data);
 }
  createForm() {
    this.alertform = this.formBuilder.group({
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
      valor:
        [
          ['']
        ],
        moeda:
        [['']],
        valorunitario:
        [['']]

    });

  }
}
