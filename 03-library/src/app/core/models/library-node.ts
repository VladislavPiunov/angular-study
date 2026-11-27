export interface LibraryNode {
  id: string;
  title: string;
  type: 'genre' | 'book';
  author?: string;
  hasChildren: boolean;
}