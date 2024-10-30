import React, { useEffect, useState } from 'react';
import { getBooks, filterBooks, deleteBook, exportBooksCSV } from '../api/api';
import '../style/BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const booksData = await getBooks();
            setBooks(booksData);
            setFilteredBooks(booksData);
        } catch (error) {
            setError("Failed to load books. Please try again.");
        }
    };

    const handleFilter = async () => {
        try {
            if (search) {
                const filteredData = await filterBooks(search);
                setFilteredBooks(filteredData);
            } else {
                setFilteredBooks(books);
            }
            setCurrentPage(1);
        } catch (error) {
            setError("Failed to filter books. Please try again.");
        }
    };

    const handleClear = () => {
        setFilteredBooks(books);
        setSearch('');
        setCurrentPage(1);
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const exportCSV = async () => {
        try {
            await exportBooksCSV(filteredBooks);
        } catch (error) {
            alert("Failed to export books. Please try again.");
        }
    };

    return (
        <div className="book-list-container">
          <div className='header'>
            <h2>Book List</h2>
            <button onClick={exportCSV} className="export-button">Export</button>
          </div>
            {error && <p className="error-message">{error}</p>}

            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search by title, author, or genre..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleFilter} className="filter-button">Filter</button>
                <button onClick={handleClear} className="clear-button">Clear</button>
            </div>

            <ul className="book-list">
                {currentBooks.map((book) => (
                    <li key={book.entryId} className="book-item">
                        <h3>{book.title}</h3>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Publication Date:</strong> {book.publicationDate}</p>
                        <p><strong>ISBN:</strong> {book.isbn}</p>
                        <button onClick={() => deleteBook(book.entryId)}>Delete</button>
                    </li>
                ))}
            </ul>

            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BookList;
