import axios from 'axios';

const API_URL = 'http://localhost:8081/api/books';

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    alert("Error fetching books");
  }
};

export const addBook = async (book) => {
  try {
    const response = await axios.post(`${API_URL}`, book);
    return response.data;
  } catch (error) {
    alert("Error adding book");
  }
};

export const deleteBook = async (bookId) => {
  try {
    await axios.delete(`${API_URL}/${bookId}`);
    alert('Book deleted successfully');
    window.location.reload();
  } catch (error) {
    alert('Error deleting book');
    throw error;
  }
};

export const exportBooksCSV = async (filteredBooks) => {
  const response = await fetch(`${API_URL}/export/csv`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filteredBooks),
  });

  if (!response.ok) {
    throw new Error('Failed to export CSV');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'filtered_books.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const filterBooks = async (searchTerm) => {
  const response = await axios.get(`${API_URL}/filter`, { params: { searchTerm } });
  return response.data;
};
