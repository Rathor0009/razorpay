import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { contactdata } from '../modal/contact';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor(public http : HttpClient) { }


  contactdetails(data: contactdata){
    let name =  data.name;
    let email =  data.email;
   let {contact,type} = data;
  return this.http.post(environment.baseurl +'/contacts',{
    name,contact,type,email
  }).subscribe((res)=>{
    console.log(res)
  })
}


}
