import { Book } from '../types/Book';

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch('/data/books.json');
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const books: Book[] = await response.json();
  return books;
}
