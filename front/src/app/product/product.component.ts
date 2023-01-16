import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare var Razorpay: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  paymentStatus: any;
  submitted = false;
  form!: FormGroup
  priceval!: any;
  titleval!: any
  amount!: any
  data: any;
  paymentResponse: any

  constructor(private fb: FormBuilder, public http: HttpClient) { }
  products = [
    {
      title: 'Coffee',
      price: 777,
      desription: 'Coffee is a drink prepared from roasted coffee beans. Darkly colored, bitter, and slightly acidic, coffee has a stimulating effect on humans, primarily due to its caffeine content. It is the most popular hot drink in the world. Seeds of the Coffea plants fruits are separated to produce unroasted green coffee beans.',
      image: 'assets/1588785226-merlot-infused-coffee-1555517171.jpg'
    },
    {
      title: 'Tea',
      price: 650,
      desription: 'tea is a drink prepared from roasted coffee beans. Darkly colored, bitter, and slightly acidic, coffee has a stimulating effect on humans, primarily due to its caffeine content. It is the most popular hot drink in the world. Seeds of the Coffea plants fruits are separated to produce unroasted green coffee beans.',
      image: 'assets/images (3).jpeg'
    },
    {
      title: 'Smoothies',
      price: 600,
      desription: 'smoothie on hand can help keep you hydrated and nourished. These thick, creamy beverages can be made by blending together your favorite fruits and veggies with healthy sources of protein and fiber.When putting together a smoothie, think protein, fat, fiber and flavor,” says Rodriguez. In addition to carbohydrates in the form of fruit or vegetables, muscle-building protein should serve as the base of your smoothie, whether it be yogurt, milk, cottage cheese or whey protein. Then add a plant-based source of fat and fiber, like nut butter and chia seeds, plus a flavorful ingredient like cocoa powder to make a delicious, nutrient-dense smoothie.',
      image: 'assets/raspberry-smoothie-royalty-free-image-1656528361.jpg'
    }
  ]

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      productPrice: ['', Validators.required],
      productName: ['', Validators.required],


    })
    // this.handler()
  }
  get f() {
    return this.form.controls;
  }


  click(selected: any) {
    // console.log(selected)
    console.log(selected.price)
    console.log(selected.title)
    this.priceval = selected.price;
    this.titleval = selected.title
    this.form.patchValue({
      productPrice: this.priceval,
      productName: this.titleval
    })

  }
  pay() {
   
    let amount = this.priceval
    console.log(amount)
    this.http.post('http://localhost:5000/razorPayy', { amount }).subscribe((response) => {
      // let string = JSON.stringify(response);
      this.data = response;
      // console.log('this.data',this.data.amount);
      // console.log(this.data.order.status)
      // console.log(this.data.amount)
      // if (this.data.order.status == "created") {
        let options = {
          "key": 'rzp_test_hYOABKStQQJGFI',
          "amount": this.data.amount,
          "currency": 'INR',
          "name": this.form.get('name')?.value,
          "description": 'test razorpayment',
          "order_id": this.data.order.id,
          // handler: this.paymentResponseHander(response),
          "handler": (response: any)=> {
            // console.log('response',response)
            let x = response;
            // console.log('qqqqqqq',x)
            this.http.post("http://localhost:5000/verify",x).subscribe((res:any)=>{
              // console.log('resss',res);
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
              console.log('payment successfull');
              Swal.fire("Good job!", "payment successfull!", "success");
            })
            // console.log('response',response)
            // console.log(response.razorpay_payment_id);
            // console.log(response.razorpay_order_id);
            // console.log(response.razorpay_signature);
            // console.log('payment successfull');
            // Swal.fire("Good job!", "payment successfull!", "success");  
              
          },
          prefill: {
            name: "",
            email: this.form.get('email')?.value,
            contact: ""
          },
          notes: {
            address: "Razorpay Corporate Office"
          },
          theme: {
            color: "#3399cc"
          }
        };
        let rzp = new Razorpay(options);
    
        rzp.on("payment.failed", function (response: any) {
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          alert('!Opps payment failed')
        })
        rzp.open();

      // } 
      // else {
      //   console.log('something wrong')
      // }

    })

  }

  // paymentResponseHander(response: any) {
  //   console.log(response.razorpay_payment_id);
  //   console.log(response.razorpay_order_id);
  //   console.log(response.razorpay_signature);
  //   console.log('payment successfull');
  //   Swal.fire("Good job!", "payment successfull!", "success");
  //   this.paymentResponse= response;
  //   console.log('paymentResponse',this.paymentResponse)
    // this.paymentRes();
    // return response;

  

  //  paymentRes(){
  //   this.http.post('http://localhost:5000/payment',this.paymentResponse).subscribe((res)=>{
  //     // console.log(res)
  //   })
  // }
}


