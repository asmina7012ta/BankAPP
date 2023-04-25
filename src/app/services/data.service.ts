import { transition } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//create globel header for header overloading
const option={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
}) 

export class DataService {
  currentUser: any
  currentAcno: any
  userDetails: any

  constructor(private http: HttpClient) {

  }
  
  getToken() {
    //access token
    const token = JSON.parse(localStorage.getItem("token") || "")
    //generate header
    let headers=new HttpHeaders()
    //check token access or not
    if(token){
      //add the token into header
      option.headers=headers.append('access_token',token)
    }
    return option
  }

  register(acno: any, uname: any, psw: any) {
    const data = { acno, uname, psw }
    return this.http.post('http://localhost:3000/register', data)
  }
  login(acno: any, psw: any) {
    const data = { acno, psw }
    return this.http.post('http://localhost:3000/login', data)

  }
  deposit(acno: any, psw: any, amount: any) {
      const data={acno,psw,amount}
      return this.http.post('http://localhost:3000/deposit',data,this.getToken())

  }

  withdraw(acno: any, psw: any, amount: any) {
    const data={acno,psw,amount}
    return this.http.post('http://localhost:3000/withdraw',data,this.getToken())
  }
  getTransaction(acno: any) {
    const data={acno}
    return this.http.post('http://localhost:3000/transaction',data,this.getToken())
  }
  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/delete/'+acno,this.getToken())
  }

}

