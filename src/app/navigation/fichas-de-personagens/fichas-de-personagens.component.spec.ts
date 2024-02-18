import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasDePersonagensComponent } from './fichas-de-personagens.component';

describe('FichasDePersonagensComponent', () => {
  let component: FichasDePersonagensComponent;
  let fixture: ComponentFixture<FichasDePersonagensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichasDePersonagensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FichasDePersonagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
