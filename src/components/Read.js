import Book from "./Book";
import Loader from "./Loader";

const Read = ({ books, handleSelections }) => {
    // for better user experience loader will appear untill get data from API
    let loader = [0, 0, 0];
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.length !== 0 ? books.filter((book) => { return book.shelf === 'read' }).map((book) => {
                        return (<Book book={book} key={book.id} handleSelections={handleSelections} />)
                    }) : loader.map((b, index) => { return <Loader key={index} /> })}
                </ol>
            </div>
        </div>
    )
}
export default Read;