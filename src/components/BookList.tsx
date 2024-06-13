// src/components/BookList.tsx
import { useState } from 'react';
import { Book } from '../types/Book';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(5); // Number of books per page
  const [sortBy, setSortBy] = useState<string>('title'); // Sort by title by default
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Sort order: asc or desc

  // Sorting function
  const sortedBooks = [...books].sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortBy === 'author') {
      return sortOrder === 'asc' ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author);
    }
    return 0;
  });

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Toggle sort order
  const toggleSortOrder = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Book List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 cursor-pointer" onClick={() => { setSortBy('title'); toggleSortOrder(); }}>
              Title
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => { setSortBy('author'); toggleSortOrder(); }}>
              Author
            </th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id} className="border-b">
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2">{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4">
        {Array.from({ length: Math.ceil(sortedBooks.length / booksPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mr-2 px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookList;
