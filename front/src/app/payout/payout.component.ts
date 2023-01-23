import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { RazorpayService } from '../service/razorpay.service';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent implements OnInit {

  payoutForm!: FormGroup;
  submitted !: boolean;

  constructor(public fb : FormBuilder, public razorpayservice : RazorpayService) { }

  ngOnInit(): void {
    this.payoutForm = this.fb.group({
      // fund_account_id: ['',[Validators.required]],
      amount: ['',[Validators.required]],
      mode :['',[Validators.required]],
      purpose:['',[Validators.required]],
    })
  }

  payout(){
    this.submitted = true;
    if(this.payoutForm.valid){
      this.razorpayservice.payout(this.payoutForm.value);
      console.log('payout completed')
    }
  }
}
