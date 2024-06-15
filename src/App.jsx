import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import booksData from './assets/books.json';

const App = () => {
  const [genre, setGenre] = useState('');
  const [maxPages, setMaxPages] = useState('');
  const [readingList, setReadingList] = useState([]);

  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleMaxPagesChange = (e) => setMaxPages(e.target.value);

  const handleAddToReadingList = (book) => {
    if (!readingList.some(item => item.ISBN === book.ISBN)) {
      setReadingList([...readingList, book]);
    }
  };

  const handleRemoveFromReadingList = (ISBN) => {
    setReadingList(readingList.filter(book => book.ISBN !== ISBN));
  };

  const filteredBooks = booksData.library.filter(item => {
    const matchesGenre = genre ? item.book.genre === genre : true;
    const matchesPages = maxPages ? item.book.pages <= maxPages : true;
    return matchesGenre && matchesPages;
  });

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <div>
      <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-white">Book Library</h1>
      </nav>
      <animated.div style={fade} className="container mx-auto p-4">
        <div className="flex justify-center space-x-4 mb-8">
          <label className="flex flex-col items-start">
            <span className="mb-2 text-lg font-semibold">Genre:</span>
            <select value={genre} onChange={handleGenreChange} className="p-2 border border-gray-300 rounded bg-white shadow">
              <option value="">All</option>
              <option value="Fantasía">Fantasía</option>
              <option value="Ciencia ficción">Ciencia ficción</option>
              <option value="Terror">Terror</option>
              <option value="Zombies">Zombies</option>
            </select>
          </label>
          <label className="flex flex-col items-start">
            <span className="mb-2 text-lg font-semibold">Max Pages:</span>
            <input type="number" value={maxPages} onChange={handleMaxPagesChange} className="p-2 border border-gray-300 rounded bg-white shadow" />
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((item, index) => (
            <animated.div key={index} className="bg-white border p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:bg-purple-100">
              <h2 className="text-2xl font-bold mb-2 text-indigo-600">{item.book.title}</h2>
              <img src={item.book.cover} alt={item.book.title} className="w-full h-48 object-cover mb-4 rounded" />
              <p><strong>Author:</strong> {item.book.author.name}</p>
              <p><strong>Genre:</strong> {item.book.genre}</p>
              <p><strong>Pages:</strong> {item.book.pages}</p>
              <p><strong>Year:</strong> {item.book.year}</p>
              <p><strong>ISBN:</strong> {item.book.ISBN}</p>
              <p className="mb-4">{item.book.synopsis}</p>
              <button 
                onClick={() => handleAddToReadingList(item.book)} 
                className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Add to Reading List
              </button>
            </animated.div>
          ))}
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-4 text-center text-green-600">Reading List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readingList.map((book, index) => (
              <animated.div key={index} className="bg-gray-100 border p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:bg-red-100">
                <h2 className="text-2xl font-bold mb-2 text-green-700">{book.title}</h2>
                <img src={book.cover} alt={book.title} className="w-full h-48 object-cover mb-4 rounded" />
                <p><strong>Author:</strong> {book.author.name}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Pages:</strong> {book.pages}</p>
                <p><strong>Year:</strong> {book.year}</p>
                <p><strong>ISBN:</strong> {book.ISBN}</p>
                <p className="mb-4">{book.synopsis}</p>
                <button 
                  onClick={() => handleRemoveFromReadingList(book.ISBN)} 
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Remove from Reading List
                </button>
              </animated.div>
            ))}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default App;
