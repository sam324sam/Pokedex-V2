import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesComponent } from './moves-component';

describe('MovesComponent', () => {
  let component: MovesComponent;
  let fixture: ComponentFixture<MovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
