import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionNode } from './evolution-node';

describe('EvolutionNode', () => {
  let component: EvolutionNode;
  let fixture: ComponentFixture<EvolutionNode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionNode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionNode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
