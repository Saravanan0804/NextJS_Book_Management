"use client";

import { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import AddBookForm from '../components/AddBookForm';
import { Book } from '../types/Book';
import { fetchBooks } from '../lib/fetchBooks';

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const addBook = (book: Book) => {
    setBooks([...books, book]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>
      <AddBookForm addBook={addBook} />
      <BookList books={books} />
    </div>
  );
};

export default Home;
