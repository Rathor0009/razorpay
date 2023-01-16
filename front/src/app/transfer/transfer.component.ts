import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(public router : Router) { }

  ngOnInit(): void {
  }

  transfer(){
    this.router.navigate(['createcontact'])
  }

}
