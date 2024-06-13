import { useState } from 'react';
import { Book } from '../types/Book';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>('title'); 
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortBy === 'author') {
      return sortOrder === 'asc' ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author);
    }
    return 0;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Book List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th
                className="px-4 py-2 cursor-pointer border-b border-gray-300"
                onClick={() => handleSort('title')}
              >
                Title
                {sortBy === 'title' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th
                className="px-4 py-2 cursor-pointer border-b border-gray-300"
                onClick={() => handleSort('author')}
              >
                Author
                {sortBy === 'author' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.id} className="border-b">
                <td className="px-4 py-2 border-r border-gray-300">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
        >
          ←
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default BookList;
