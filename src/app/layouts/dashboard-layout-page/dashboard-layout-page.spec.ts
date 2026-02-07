import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayoutPage } from './dashboard-layout-page';

describe('DashboardLayoutPage', () => {
  let component: DashboardLayoutPage;
  let fixture: ComponentFixture<DashboardLayoutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLayoutPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
