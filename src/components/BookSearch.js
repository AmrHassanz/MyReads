import { Link } from "react-router-dom";
import { useState } from "react";
import Book from "./Book";

const BookSearch = ({ handleSelections, getSearchBooks, books }) => {

    // save search values in query (controlled component)
    const [query, setQuery] = useState('');

    // when user type in the search, getSearchBooks() will put search result in search state in App.js
    const updateQuery = (query) => {
        setQuery(query);
        if (query) {
            getSearchBooks(query);
        }
    };

    // showingBooks controls showed books, when empty nothing will appear
    let showingBooks = [];
        if (query !== '') {
            if (books.length !== 0) {
                showingBooks = books.filter((book) => {
                    if (book.authors && book.authors.filter((author) => { return author.toLowerCase().includes(query.toLowerCase()) }).length !== 0) {
                        return true;
                    }
                    else if (book.title.toLowerCase().includes(query.toLowerCase())) {
                        return true;
                    }
                })
            }
        };





    return (
        <div className="app">
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN"
                            value={query}
                            onChange={(e) => { updateQuery(e.target.value) }} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => {
                            return <Book key={book.id} book={book} handleSelections={handleSelections} />
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}
export default BookSearch;

