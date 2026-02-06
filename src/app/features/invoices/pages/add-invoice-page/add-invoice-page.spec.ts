import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvoicePage } from './add-invoice-page';

describe('AddInvoicePage', () => {
  let component: AddInvoicePage;
  let fixture: ComponentFixture<AddInvoicePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInvoicePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvoicePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
