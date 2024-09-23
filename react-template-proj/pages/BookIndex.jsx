const { useEffect, useState } = React

const { Link } = ReactRouterDOM


import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])


    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problems gettibg cars:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems rmeoving book:', err)
            })

    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <h1>Loading..</h1>
    return (
        <section className="book-index">
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <section>
                <Link to="/book/edit">Add Book</Link>
            </section>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}