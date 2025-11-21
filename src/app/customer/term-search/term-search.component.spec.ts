import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermSearchComponent } from './term-search.component';

describe('TermSearchComponent', () => {
  let component: TermSearchComponent;
  let fixture: ComponentFixture<TermSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
