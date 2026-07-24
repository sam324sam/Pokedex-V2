import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMinigamesView } from './select-minigames-view';

describe('SelectMinigamesView', () => {
  let component: SelectMinigamesView;
  let fixture: ComponentFixture<SelectMinigamesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMinigamesView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectMinigamesView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
