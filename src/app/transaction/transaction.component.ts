import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  transactionArray:any
  constructor(private ds:DataService){
//ADD transaction data
    this.ds.getTransaction(JSON.parse(localStorage.getItem('currentAcno') || "")).subscribe((result:any)=>{
        this.transactionArray=result.transaction
      })

    console.log(this.transactionArray);
    
  }

}
