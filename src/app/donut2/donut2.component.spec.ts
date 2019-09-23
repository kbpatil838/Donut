import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Donut2Component } from './donut2.component';

describe('Donut2Component', () => {
  let component: Donut2Component;
  let fixture: ComponentFixture<Donut2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Donut2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Donut2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
