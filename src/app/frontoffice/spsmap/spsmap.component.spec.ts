import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpsmapComponent } from './spsmap.component';

describe('SpsmapComponent', () => {
  let component: SpsmapComponent;
  let fixture: ComponentFixture<SpsmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpsmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpsmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
