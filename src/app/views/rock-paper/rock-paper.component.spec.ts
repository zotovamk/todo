import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RockPaperComponent } from './rock-paper.component';

describe('RockPaperComponent', () => {
  let component: RockPaperComponent;
  let fixture: ComponentFixture<RockPaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RockPaperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RockPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
