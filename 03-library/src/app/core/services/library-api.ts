import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { LibraryNode } from '../models/library-node';

@Injectable({ providedIn: 'root' })
export class LibraryApi {

  getChildren(parentId: string | null): Observable<LibraryNode[]> {
    return of(this.generateMock(parentId)).pipe(delay(400));
  }

  private generateMock(parentId: string | null): LibraryNode[] {
    if (parentId === null) {
      return ['Фантастика', 'Детективы', 'Классика', 'Наука', 'Поэзия'].map(
        (title, i) => ({
          id: `genre-${i}`,
          title,
          type: 'genre' as const,
          hasChildren: true,
        })
      );
    }
    return Array.from({ length: 20 }, (_, i) => {
      const isBook = (i+1) % 3 === 2;
      return {
        id: `${parentId}-${i+1}`,
        title: isBook ? `Книга №${i+1}` : `Раздел ${i+1}`,
        type: isBook ? ('book' as const) : ('genre' as const),
        author: isBook ? 'Автор Авторович' : undefined,
        hasChildren: !isBook,
      };
    });
  }
}