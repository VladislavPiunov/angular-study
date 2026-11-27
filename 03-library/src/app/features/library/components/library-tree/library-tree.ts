import { Component, OnInit, OnDestroy, inject, output } from '@angular/core';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Subject, takeUntil } from 'rxjs';
import { LibraryApi } from '../../../../core/services/library-api';
import { FlatNode, toFlatNode } from './flat-node';
import { LibraryTreeDataSource } from './library-tree-data-source';
import { HighlightOnHover } from '../../../../shared/directives/highlight-on-hover';

@Component({
  selector: 'app-library-tree',
  imports: [CdkTreeModule, ScrollingModule, HighlightOnHover],
  templateUrl: './library-tree.html',
  styleUrl: './library-tree.scss',
})
export class LibraryTree implements OnInit, OnDestroy {
  private api = inject(LibraryApi);
  private destroy$ = new Subject<void>();

  readonly bookSelected = output<FlatNode>();
  readonly dataSource = new LibraryTreeDataSource();

  readonly levelAccessor = (node: FlatNode): number => node.level;
  readonly trackBy = (_: number, node: FlatNode): string => node.id;
  readonly hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  ngOnInit(): void {
    this.api
      .getChildren(null)
      .pipe(takeUntil(this.destroy$))
      .subscribe((nodes) => {
        this.dataSource.setData(nodes.map((n) => toFlatNode(n, 0)));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onNodeClick(node: FlatNode): void {
    if (!node.expandable && node.type === 'book') {
      this.bookSelected.emit(node);
    }
  }

  onExpandedChange(isExpanded: boolean, node: FlatNode): void {
    node.expanded = isExpanded;

    if (isExpanded) {
      this.expand(node);
    } else {
      this.collapse(node);
    }
  }

  private expand(node: FlatNode): void {
    if (node.childrenLoaded || node.isLoading) return;

    node.isLoading = true;
    this.dataSource.setData([...this.dataSource.data]);

    this.api
      .getChildren(node.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (children) => {
          const data = [...this.dataSource.data];
          const index = data.findIndex((n) => n.id === node.id);
          node.isLoading = false;
          node.childrenLoaded = true;
          data.splice(
            index + 1,
            0,
            ...children.map((c) => toFlatNode(c, node.level + 1))
          );
          this.dataSource.setData(data);
        },
        error: () => {
          node.isLoading = false;
          this.dataSource.setData([...this.dataSource.data]);
        },
      });
  }

  private collapse(node: FlatNode): void {
    const data = [...this.dataSource.data];
    const index = data.findIndex((n) => n.id === node.id);
    if (index === -1) return;

    let descendantsCount = 0;
    for (let i = index + 1; i < data.length && data[i].level > node.level; i++) {
      descendantsCount++;
    }
    data.splice(index + 1, descendantsCount);
    node.childrenLoaded = false;
    this.dataSource.setData(data);
  }
}