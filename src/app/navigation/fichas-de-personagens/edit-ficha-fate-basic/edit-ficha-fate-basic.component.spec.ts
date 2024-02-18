import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFichaFateBasicComponent } from './edit-ficha-fate-basic.component';

describe('EditFichaFateBasicComponent', () => {
  let component: EditFichaFateBasicComponent;
  let fixture: ComponentFixture<EditFichaFateBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFichaFateBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFichaFateBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
