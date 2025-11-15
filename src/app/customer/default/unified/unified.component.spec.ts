import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedComponent } from './unified.component';

describe('UnifiedComponent', () => {
  let component: UnifiedComponent;
  let fixture: ComponentFixture<UnifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
