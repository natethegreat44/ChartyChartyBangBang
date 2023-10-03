import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VegachartComponent } from './vegachart.component';

describe('VegachartComponent', () => {
  let component: VegachartComponent;
  let fixture: ComponentFixture<VegachartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VegachartComponent]
    });
    fixture = TestBed.createComponent(VegachartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
