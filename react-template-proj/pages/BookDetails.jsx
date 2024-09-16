const { useEffect, useState } = React

import { bookService } from "../services/book.service.js"

export function BookDetails({ onBack, bookId }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err)
            })
    }

    if (!book) return <div>Loading..</div>
    return (
        <section className="book-details">
            <h1>Book Title: {book.title}</h1>
            <h1>Book Price: {book.listPrice}</h1>
            <button onClick={onBack}>Back</button>
        </section>
    )
}