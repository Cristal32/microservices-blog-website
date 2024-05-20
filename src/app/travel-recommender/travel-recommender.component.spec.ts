import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRecommenderComponent } from './travel-recommender.component';

describe('TravelRecommenderComponent', () => {
  let component: TravelRecommenderComponent;
  let fixture: ComponentFixture<TravelRecommenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelRecommenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelRecommenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
