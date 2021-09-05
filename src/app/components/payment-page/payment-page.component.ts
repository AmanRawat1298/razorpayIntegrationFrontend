import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, catchError} from "rxjs/operators";
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  paymentStart()
  {
    console.log("Payment Method");
    let amount: Number = 148;
    let obj = {
      amount: amount
    };

    let url  = "http://localhost:8080/payment/";
    
    

    

    // this.http.post(url+'createOrder', obj)
    // .pipe(
    //   map((data) => {
    //     //You can perform some transformation here
    //     console.log("Response");
    //     console.log(data);
    //    return data;
    //  }),
    //  catchError((err) => {
    //    console.error(err);
    //    throw err;
    //      }
    //    )
    // )
    this.http.post(url+'createOrder', obj).subscribe(response => {
      //do something with response
      console.log("Response with subscribe");
      console.log(response);

      var options = {
        key: "YOUR_KEY_ID", 
        amount: "50000", 
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "order_9A33XWu170gUtm", 
        "handler": function (orderResponse :any){
        alert(orderResponse.razorpay_payment_id);
        alert(orderResponse.razorpay_order_id);
        alert(orderResponse.razorpay_signature)
        },
        "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
        },
        "notes": {
        "address": "Razorpay Corporate Office"
        },
        "theme": {
        "color": "#3399cc"
      }
      };

      // var rzp1 = new Razorpay(options);
      // rzp1.on('payment.failed', function (confirmationResponse){
      // alert(confirmationResponse.error.code);
      // alert(confirmationResponse.error.description);
      // alert(confirmationResponse.error.source);
      // alert(confirmationResponse.error.step);
      // alert(confirmationResponse.error.reason);
      // alert(confirmationResponse.error.metadata.order_id);
      // alert(confirmationResponse.error.metadata.payment_id);
      // });





     
    }, err => {
      console.log("Error");
      console.log(err.message);
    }, () => {
      console.log('completed');
    });

  
  }


}
