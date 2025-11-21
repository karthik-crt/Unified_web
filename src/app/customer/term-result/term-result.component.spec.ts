import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermResultComponent } from './term-result.component';

describe('TermResultComponent', () => {
  let component: TermResultComponent;
  let fixture: ComponentFixture<TermResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
