import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMembership } from './my-membership';

describe('MyMembership', () => {
  let component: MyMembership;
  let fixture: ComponentFixture<MyMembership>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMembership],
    }).compileComponents();

    fixture = TestBed.createComponent(MyMembership);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
