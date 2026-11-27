import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlatNode } from './flat-node';

export class LibraryTreeDataSource extends DataSource<FlatNode> {
  private readonly dataSubject = new BehaviorSubject<FlatNode[]>([]);

  get data(): FlatNode[] {
    return this.dataSubject.value;
  }

  setData(nodes: FlatNode[]): void {
    this.dataSubject.next(nodes);
  }

  connect(): Observable<FlatNode[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {}
}