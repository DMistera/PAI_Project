import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouramentEditComponent } from './tourament-edit.component';

describe('TouramentEditComponent', () => {
  let component: TouramentEditComponent;
  let fixture: ComponentFixture<TouramentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouramentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouramentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
