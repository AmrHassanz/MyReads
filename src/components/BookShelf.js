import { Link } from "react-router-dom";
import CurrentlyReadingShelf from "./CurrentlyReadingShelf";
import Read from "./Read";
import WantToReadShelf from "./WantToReadShelf";
const BookShelf = ({ books, handleSelections }) => {
    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <CurrentlyReadingShelf books={books} handleSelections={handleSelections} />
                        <WantToReadShelf books={books} handleSelections={handleSelections} />
                        <Read books={books} handleSelections={handleSelections} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        </div>
    )
}
export default BookShelf;