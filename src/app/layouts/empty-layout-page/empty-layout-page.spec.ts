import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyLayoutPage } from './empty-layout-page';

describe('EmptyLayoutPage', () => {
  let component: EmptyLayoutPage;
  let fixture: ComponentFixture<EmptyLayoutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyLayoutPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyLayoutPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
