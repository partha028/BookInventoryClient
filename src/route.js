import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/NavBar';
import AddBook from './component/AddBook';
import BookList from './component/BookList';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/add" element={<AddBook />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/" element={<BookList />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
