import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertWalletComponent } from './cert-wallet.component';

describe('CertWalletComponent', () => {
  let component: CertWalletComponent;
  let fixture: ComponentFixture<CertWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
