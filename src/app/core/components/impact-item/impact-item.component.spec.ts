import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactItemComponent } from './impact-item.component';

describe('ImpactItemComponent', () => {
  let component: ImpactItemComponent;
  let fixture: ComponentFixture<ImpactItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
