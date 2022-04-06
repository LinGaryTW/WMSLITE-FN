import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingEngineComponent } from './searching-engine.component';

describe('SearchingEngineComponent', () => {
  let component: SearchingEngineComponent;
  let fixture: ComponentFixture<SearchingEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchingEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchingEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
