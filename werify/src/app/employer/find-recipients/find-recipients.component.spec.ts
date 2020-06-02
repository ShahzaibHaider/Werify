import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRecipientsComponent } from './find-recipients.component';

describe('FindRecipientsComponent', () => {
  let component: FindRecipientsComponent;
  let fixture: ComponentFixture<FindRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
