import React, {useState} from 'react';
import { addBook } from '../api/api';
import '../style/AddBook.css'

const AddBook = () => {
    const [book, setBook] = useState({
      title: '',
      author: '',
      genre: '',
      publicationDate: '',
      isbn: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addBook(book);
        alert('Book added successfully');
        setBook({ title: '', author: '', genre: '', publicationDate: '', isbn: '' });
      } catch (error) {
        alert("Failed to add book");
      }
    };
  
    return (
      <div className="add-book-container">
        <h2>Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Genre:
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
            />
          </label>
          <label>
            Publication Date:
            <input
              type="date"
              name="publicationDate"
              value={book.publicationDate}
              onChange={handleChange}
            />
          </label>
          <label>
            ISBN:
            <input
              type="text"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Add Book</button>
        </form>
      </div>
    );
  };
  
  export default AddBook;