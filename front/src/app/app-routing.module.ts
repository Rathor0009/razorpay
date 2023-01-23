import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFundComponent } from './add-fund/add-fund.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { PayoutComponent } from './payout/payout.component';
import { Payout1Component } from './payout1/payout1.component';
import { ProductComponent } from './product/product.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'createcontact', component: CreateContactComponent },
  { path: 'add-fund', component: AddFundComponent },
  { path: 'payout', component: PayoutComponent },
  { path: 'payout1', component: Payout1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
