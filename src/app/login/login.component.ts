import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventType, Router, RouteReuseStrategy } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data = "your perfect banking partner"
  data1 = "enter your account number"

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }
  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-z0-9]+')]]
  })

  login() {
    var acnum = this.loginForm.value.acno
    var psw = this.loginForm.value.psw
    if (this.loginForm.valid) {
      this.ds.login(acnum, psw).subscribe((result:any)=>{

        localStorage.setItem("currentUser",result.currentUser)
        localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
        localStorage.setItem("token",JSON.stringify(result.token))

        alert(result.message)
        this.router.navigateByUrl("dashboard")
      },
        result=>{
          alert(result.error.message)
        })
      
    }
   else {
   alert("invalid form")
   }

  }
}