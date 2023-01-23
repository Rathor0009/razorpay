import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payout1Component } from './payout1.component';

describe('Payout1Component', () => {
  let component: Payout1Component;
  let fixture: ComponentFixture<Payout1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Payout1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Payout1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
