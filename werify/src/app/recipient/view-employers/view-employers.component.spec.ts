import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployersComponent } from './view-employers.component';

describe('ViewEmployersComponent', () => {
  let component: ViewEmployersComponent;
  let fixture: ComponentFixture<ViewEmployersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmployersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
