import { Component } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }
  //model for registration form
  registerForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]]
  })

  register() {
    var acnum = this.registerForm.value.acno
    var uname = this.registerForm.value.uname
    var psw = this.registerForm.value.psw
    if (this.registerForm.valid) {
     this.ds.register(acnum,uname,psw).subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl("")
     },
     result=>{
      alert(result.error.message)
    }
      )
}
else{
  alert("invalid form")
}}}
