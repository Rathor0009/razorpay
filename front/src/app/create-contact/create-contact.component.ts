import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RazorpayService } from '../service/razorpay.service';
import { contactdata } from '../modal/contact';


@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  contactForm! :FormGroup;
  submitted! : boolean;
  

  constructor(public router :Router,private fb: FormBuilder,public razorPayservice : RazorpayService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      contact:['',[Validators.required]],
      type :['',[Validators.required]]
    })
  }

  send(){
    this.submitted = true;
    if(this.contactForm.valid){
      this.razorPayservice.contactdetails(this.contactForm.value)
    this.router.navigate(['add-fund']);
    }
  }

}
