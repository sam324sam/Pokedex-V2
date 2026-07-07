import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexView } from './pokedex-view';

describe('PokedexView', () => {
  let component: PokedexView;
  let fixture: ComponentFixture<PokedexView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
