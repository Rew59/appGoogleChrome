import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWordsComponent } from './add-words.component';

describe('AddWordsComponent', () => {
  let component: AddWordsComponent;
  let fixture: ComponentFixture<AddWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
