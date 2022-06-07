import "../css/App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from '../utils/BooksAPI';
import BookSearch from "./BookSearch";
import BookShelf from "./BookShelf";
import { Route, Routes } from "react-router-dom";

function App() {
  // the main array = [ books with shelves + books from search ]
  const [books, setBooks] = useState([]);
  // books with shelf
  const [shelves, setShelves] = useState([]);
  // books from search
  const [search, setSearch] = useState([]);

  // get books with assigned shelf
  const getBooks = async () => {
    const res = await BooksAPI.getAll();
    setShelves(res);
    setBooks([...res, ...search]);
  };

  // call getBook() in component did mount to show user saved books when open MyReads 
  useEffect(() => {
    getBooks();
  }, []);

  // when user want to change the book shelf
  const handleSelections = async (shelf, book) => {
    // shelf, select book shelf (currentlyReading , wantToRead , read , undefined)
    // book,  object contains selected book info
    // case(1) the book is on the shelf and user choose (currentlyReading or wantToRead or read)
    if (book.shelf === 'currentlyReading' || book.shelf === 'wantToRead' || book.shelf === 'read') {
      if (shelf !== 'none') {
        let updatedShelves = shelves.map((b) => { return b.id === book.id ? { ...book, shelf } : b });
        setShelves(updatedShelves);
        setBooks([...updatedShelves, ...search]);
        await BooksAPI.update(book, shelf);
      }
      // case(2) the book is on the shelf and user choose (none)
      else {
        let updatedShelves = shelves.filter((b) => { return b.id !== book.id });
        let updatedSearch = [...search, { ...book, shelf: undefined }];
        setShelves(updatedShelves);
        setSearch(updatedSearch);
        setBooks([...updatedShelves, ...updatedSearch]);
        await BooksAPI.update(book, shelf);
      }
    }
    // case(3) the book is not on the shelf and user choose (currentlyReading or wantToRead or read)
    else if (book.shelf === undefined) {
      let updatedShelves = [...shelves, { ...book, shelf }];
      let updatedSearch = search.filter((b) => { return b.id !== book.id });
      setShelves(updatedShelves);
      setSearch(updatedSearch);
      setBooks([...updatedShelves, ...updatedSearch]);
      await BooksAPI.update(book, shelf);
    }
  };

  // when user type in the search input
  const getSearchBooks = async (query) => {
    let res = await BooksAPI.search(query);
    // check if there is a book in shelves and search with same id
    // this will make problem when adding key={} to the book component, to help in versual dom
    if (res.error !== 'empty query') {
      let filteredSearch = res.filter((ele) => { return shelves.map((b) => { return b.id }).indexOf(ele.id) === -1 });
      setSearch(filteredSearch);
      setBooks([...shelves, ...filteredSearch]);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<BookShelf books={books} handleSelections={handleSelections} />} />
      <Route path="/MyReads/" element={<BookShelf books={books} handleSelections={handleSelections} />} />
      <Route path="/search" element={<BookSearch books={books} handleSelections={handleSelections} getSearchBooks={getSearchBooks} />} />
    </Routes>
  );
}

export default App;

