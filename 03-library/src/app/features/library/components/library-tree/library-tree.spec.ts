import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryTree } from './library-tree';

describe('LibraryTree', () => {
  let component: LibraryTree;
  let fixture: ComponentFixture<LibraryTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryTree],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryTree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
