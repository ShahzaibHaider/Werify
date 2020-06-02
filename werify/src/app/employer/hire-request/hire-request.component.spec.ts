import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HireRequestComponent } from './hire-request.component';

describe('HireRequestComponent', () => {
  let component: HireRequestComponent;
  let fixture: ComponentFixture<HireRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
