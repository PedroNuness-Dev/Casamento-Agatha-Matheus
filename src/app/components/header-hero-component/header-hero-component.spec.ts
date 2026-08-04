import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHeroComponent } from './header-hero-component';

describe('HeaderHeroComponent', () => {
  let component: HeaderHeroComponent;
  let fixture: ComponentFixture<HeaderHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
