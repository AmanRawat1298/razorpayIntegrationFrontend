import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ExternalLibraryService } from './util';
import {order} from "src/app/components/order";


declare let Razorpay: any;


@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {

  constructor(private http : HttpClient,private razorpayService: ExternalLibraryService) { }

  ngOnInit(): void {
    this.razorpayService
    .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
    .subscribe();
  }

  paymentStart()
  {
    console.log("Payment Method");
    let amount: Number = 200;
    let obj = {
      amount: amount
    };

    let url  = "http://localhost:8080/payment/";
    
    

    
    this.http.post<order>(url+'createOrder', obj).subscribe(response => {
      //do something with response
      console.log("Response with subscribe");
      console.log(response);
      console.log(response.id);

      
    
      let isSuccessfull : boolean = false;
      let paymentCompleteRazorpayResponse: any;

      let options = {
        key: response.key, 
        amount: response.amount, 
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: response.id, 
        handler: function (orderResponse :any){
          alert("PAYMENT SUCCESSFUL\n" + orderResponse.razorpay_payment_id + orderResponse.razorpay_order_id + orderResponse.razorpay_signature);
          console.log("PAYMENT SUCCESSFULL");
          console.log(orderResponse);
      
          //if payment is successful
          isSuccessfull = true;
          paymentCompleteRazorpayResponse = orderResponse;


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

      let razorpay = new Razorpay(options)

      //if payment fails
      razorpay.on("payment.failed", function (failedResponse: any){
        console.log(failedResponse);
        alert("FAILED Payment");
      })

      razorpay.open();

      //if payment fails
      razorpay.on("payment.failed", function (failedResponse: any){
        console.log(failedResponse);
        alert("FAILED Payment");
      })

      setTimeout(()=>{
        if(isSuccessfull)
        {
          
          this.http.post<any>(url+'paymentComplete', paymentCompleteRazorpayResponse).subscribe(response => {
              console.log("data added successfully");
              console.log(response);
          },
          error => {
            console.log(error);
          })
        }
        else
        {
          console.log("Payment failed");
        }
      }, 15000);

     
    }, err => {
      console.log("Error");
      console.log(err.message);
    }, () => {
      console.log('completed');

    });

  
    
  }


}
