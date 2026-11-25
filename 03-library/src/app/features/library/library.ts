import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LibraryTree } from './components/library-tree/library-tree';
import { FlatNode } from './components/library-tree/flat-node';

@Component({
  selector: 'app-library',
  imports: [RouterOutlet, LibraryTree],
  templateUrl: './library.html',
  styleUrl: './library.scss',
})
export class Library {
  private router = inject(Router);

  openBook(node: FlatNode): void {
    this.router.navigate(['/library/book', node.id]);
  }
}