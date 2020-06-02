import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipientComponent } from './view-recipient.component';

describe('ViewRecipientComponent', () => {
  let component: ViewRecipientComponent;
  let fixture: ComponentFixture<ViewRecipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRecipientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
