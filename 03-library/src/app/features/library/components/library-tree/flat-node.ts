import { LibraryNode } from '../../../../core/models/library-node';

export interface FlatNode {
  id: string;
  title: string;
  type: 'genre' | 'book';
  author?: string;
  level: number;
  expandable: boolean;
  expanded: boolean;
  isLoading: boolean;
  childrenLoaded: boolean;
}

export function toFlatNode(node: LibraryNode, level: number): FlatNode {
  return {
    id: node.id,
    title: node.title,
    type: node.type,
    author: node.author,
    level,
    expandable: node.hasChildren,
    expanded: false,
    isLoading: false,
    childrenLoaded: false,
  };
}