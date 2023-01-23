import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payout1',
  templateUrl: './payout1.component.html',
  styleUrls: ['./payout1.component.css']
})
export class Payout1Component implements OnInit {
  form !: FormGroup;
  submitted! : boolean

  constructor() { }

  ngOnInit(): void {
  }

}
