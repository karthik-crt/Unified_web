import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscationsHistoryComponent } from './transcations-history.component';

describe('TranscationsHistoryComponent', () => {
  let component: TranscationsHistoryComponent;
  let fixture: ComponentFixture<TranscationsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscationsHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscationsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
