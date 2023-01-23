import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TransferComponent } from './transfer/transfer.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { AddFundComponent } from './add-fund/add-fund.component';
import { PayoutComponent } from './payout/payout.component';
import { Payout1Component } from './payout1/payout1.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    TransferComponent,
    CreateContactComponent,
    AddFundComponent,
    PayoutComponent,
    Payout1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
