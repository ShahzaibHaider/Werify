import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsWerifyComponent } from './what-is-werify.component';

describe('WhatIsWerifyComponent', () => {
  let component: WhatIsWerifyComponent;
  let fixture: ComponentFixture<WhatIsWerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatIsWerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIsWerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
