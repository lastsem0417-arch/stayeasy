import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMembers } from './view-members';

describe('ViewMembers', () => {
  let component: ViewMembers;
  let fixture: ComponentFixture<ViewMembers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMembers],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMembers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
