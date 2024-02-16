import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FateBasicComponent } from './fate-basic.component';

describe('FateBasicComponent', () => {
  let component: FateBasicComponent;
  let fixture: ComponentFixture<FateBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FateBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FateBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
