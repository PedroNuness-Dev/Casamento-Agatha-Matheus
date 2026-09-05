import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenteComponent } from './presente-component';

describe('PresenteComponent', () => {
  let component: PresenteComponent;
  let fixture: ComponentFixture<PresenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresenteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PresenteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
