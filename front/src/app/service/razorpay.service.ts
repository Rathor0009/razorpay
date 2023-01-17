import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { contactdata } from '../modal/contact';
import { funddata } from '../modal/fund';
import { payoutdata } from '../modal/payout';
import { upidata } from '../modal/upi';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {
  constructor(public http: HttpClient) { }
  contactdetail!: any;
  fundDetail!: any;


  contactdetails(data: contactdata) {
    let name = data.name;
    let email = data.email;
    let { contact, type } = data;
    return this.http.post(environment.baseurl + '/contacts', {
      name, contact, type, email
    }).subscribe((res) => {
      // console.log(res)
      this.contactdetail = res;

      console.log("contactdetail", this.contactdetail.contacts.id)
    })
  }

  Funddetailsbybank(data: funddata) {
    let contact_id = this.contactdetail.contacts.id;
    let account_type = data.account_type;
    let bank_account = data.bank_account;
    let name = data.bank_account.name;
    let ifsc = data.bank_account.ifsc;
    let account_number = data.bank_account.account_number;

    return this.http.post(environment.baseurl + '/FundAccount', {
      contact_id, account_type, bank_account, name, ifsc, account_number
    }).subscribe((res) => {
      // console.log(res)
      this.fundDetail = res;
      console.log("funddetails", this.fundDetail.FundAccounts.id)
    })
  }


  Funddetailsbyupi(data:upidata){
    let contact_id = this.contactdetail.contacts.id;
    let account_type = data.account_type;
    let vpa = data.vpa;
    let address = data.vpa.address;
  return this.http.post(environment.baseurl +'/FundAccountupi',{
    contact_id,account_type,vpa,address
  }).subscribe((res)=>{
    console.log(res);
    this.fundDetail = res;
    console.log("funddetailsbyupi", this.fundDetail.FundAccounts.id)
  })
  }



  payout(data: payoutdata) {
    let fund_account_id = this.fundDetail.FundAccounts.id;
    let amount = data.amount;
    let mode = data.mode;
    let purpose = data.purpose;

    return this.http.post(environment.baseurl + '/payout', {
      fund_account_id, amount, mode,purpose
    }).subscribe((res) => {
      console.log('res',res)
    })
  }

}
