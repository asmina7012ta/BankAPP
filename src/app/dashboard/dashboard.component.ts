import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any
  acno: any
  sdate: any
  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    // this.user = this.ds.currentUser
    //access data from dataservice ad store in a variable
    this.user=localStorage.getItem("currentUser")
    this.sdate = new Date()
  }
  ngOnInit(): void {
    if (!localStorage.getItem("currentAcno")) {
      alert('please log in')
      this.router.navigateByUrl("")
    }
  }
  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  })
  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  })
  Deposit() {
    var acno = this.depositForm.value.acno
    var psw = this.depositForm.value.psw
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid) {
     this.ds.deposit(acno, psw, amount).subscribe((result:any)=>{
      alert(result.message)
        },
    result=>{
      alert(result.error.message)
    }
     )
    }else{
      alert('invalid form')
    }
  }
  
  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var psw = this.withdrawForm.value.psw1
    var amount = this.withdrawForm.value.amount1
    if (this.withdrawForm.valid) {
    this.ds.withdraw(acno, psw, amount).subscribe((result:any)=>{
      alert(result.message)
    },result=>{
      alert(result.error.message)
    })
  }else{
    alert('invalid form')
  }
  }
  logout() {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")
    this.router.navigateByUrl("")
  }
  deleteAcc() {
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
  }
  cancelChild(){
    this.acno=""
  }
  onDeleteAcc(event:any){
   this.ds.deleteAcc(event).subscribe((result:any)=>{
    alert(result.message)
    this.logout() 
    })    


  
  
  }
}
