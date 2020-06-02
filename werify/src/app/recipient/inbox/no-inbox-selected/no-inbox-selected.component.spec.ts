import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoInboxSelectedComponent } from './no-inbox-selected.component';

describe('NoInboxSelectedComponent', () => {
  let component: NoInboxSelectedComponent;
  let fixture: ComponentFixture<NoInboxSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoInboxSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoInboxSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
