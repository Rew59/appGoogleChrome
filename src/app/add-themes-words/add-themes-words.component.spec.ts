import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThemesWordsComponent } from './add-themes-words.component';

describe('AddThemesWordsComponent', () => {
  let component: AddThemesWordsComponent;
  let fixture: ComponentFixture<AddThemesWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddThemesWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThemesWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
