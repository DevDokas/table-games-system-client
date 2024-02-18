import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardConfigurationsComponent } from './board-configurations.component';

describe('BoardConfigurationsComponent', () => {
  let component: BoardConfigurationsComponent;
  let fixture: ComponentFixture<BoardConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardConfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
