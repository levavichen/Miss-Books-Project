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

    const { id, title, subtitle, authors, publishedDate, description,
        pageCount, categories, thumbnail, language,
        listPrice: { amount, currencyCode, isOnSale } } = book


    return (
        <section className="book-details">
            <h1>Title: {title}</h1>
            <h1>Book Price: {amount}</h1>
            <p>Subtitle: {subtitle}</p>
            <p>Authors: {authors}</p>
            <p>Language: {language}</p>
            <p>Publish Date: {publishedDate}</p>
            <p>Page Count: {pageCount}</p>
            <p>Book Categories: {categories}</p>
            <p>Description: {description}</p>
            <img src={thumbnail} alt="book-image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}