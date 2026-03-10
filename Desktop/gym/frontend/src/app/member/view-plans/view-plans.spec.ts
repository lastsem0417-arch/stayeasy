import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlans } from './view-plans';

describe('ViewPlans', () => {
  let component: ViewPlans;
  let fixture: ComponentFixture<ViewPlans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPlans],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPlans);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
