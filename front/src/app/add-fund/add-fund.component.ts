import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, Form, FormArray } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { RazorpayService } from '../service/razorpay.service';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})
export class AddFundComponent implements OnInit {
  addfundForm!: FormGroup;
  submitted!: boolean;
  selectedFormName! : string;
  formList!: FormArray;
  bank_account!: FormGroup;
  upiforrm!: FormGroup;
  selected: any;

  constructor(public fb: FormBuilder, public razorpayservice: RazorpayService ,public router : Router) { }

  ngOnInit(): void {
    this.addfundForm = this.fb.group({
      account_type: ['', [Validators.required]],
      bank_account: this.fb.group({
        name: ['', [Validators.required]],
        ifsc: ['', [Validators.required]],
        account_number: ['', [Validators.required]],
      }),
      vpa : this.fb.group({
        address : ['',[Validators.required]]
      })
    })
  }


  // bankaccount(){
  //   this.bank_account = this.fb.group({
  //     name: ['', [Validators.required]],
  //     ifsc: ['', [Validators.required]],
  //     account_number: ['', [Validators.required]],
  //   })
  // }

  // upi(){
  //   this.upiforrm = this.fb.group({
  //     address: ['', [Validators.required]],
  //   })
  // }


  addfund() {
    this.submitted = true;
    if(this.selected === 'bank_account'){
      this.razorpayservice.Funddetailsbybank(this.addfundForm.value);
      console.log('bybank',this.addfundForm.value);
    }
    else{
     this.razorpayservice.Funddetailsbyupi(this.addfundForm.value);
     console.log('byupi',this.addfundForm.value);
    }
    this.router.navigate(['payout']);
  }


  onOptionsSelected(event:Event){
    const value = (event.target as HTMLTextAreaElement).value;  
   this.selected = value;
   console.log(value);
  }
}
