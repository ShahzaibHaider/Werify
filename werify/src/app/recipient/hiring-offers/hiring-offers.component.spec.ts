import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringOffersComponent } from './hiring-offers.component';

describe('HiringOffersComponent', () => {
  let component: HiringOffersComponent;
  let fixture: ComponentFixture<HiringOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
