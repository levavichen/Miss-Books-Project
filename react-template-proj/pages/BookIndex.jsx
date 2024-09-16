const { useEffect, useState } = React

import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/book.service.js"


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
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
}