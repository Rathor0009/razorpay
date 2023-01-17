import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFundComponent } from './add-fund/add-fund.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { PayoutComponent } from './payout/payout.component';
import { ProductComponent } from './product/product.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'createcontact', component: CreateContactComponent },
  { path: 'add-fund', component: AddFundComponent },
  { path: 'payout', component: PayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
