import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDesignComponent } from './certificate-design.component';

describe('CertificateDesignComponent', () => {
  let component: CertificateDesignComponent;
  let fixture: ComponentFixture<CertificateDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
