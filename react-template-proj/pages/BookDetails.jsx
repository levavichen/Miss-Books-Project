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

    function getTypeOfReading() {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount < 500 && pageCount > 200) return 'Descent Reading'
        if (pageCount < 100) return 'Light Reading'
        return ''
    }

    function getTypeByPublishTime() {
        if ((2024 - publishedDate) > 10) return 'Vintage'
        if ((2024 - publishedDate) <= 1) return 'New'
        return ''
    }

    function getAmountClass() {
        if (amount > 100) return 'red'
        if (amount < 20) return 'green'
        return ''
    }




    const typeOfReading = getTypeOfReading()
    const typeByPublishTime = getTypeByPublishTime()
    const amountClass = getAmountClass()

    return (
        <section className="book-details">
            <h1>{title}</h1>
            <h3>Book Price: <span className={`amount ${amountClass}`}>{amount}</span></h3>
            <p>Authors: {authors}</p>
            <p>Description: {description}</p>
            <p>Subtitle: {subtitle}</p>
            <p>Language: {language}</p>
            <p>Book Categories: {categories}</p>
            <p>{typeOfReading}</p>
            <p>{typeByPublishTime}</p>
            <img src={thumbnail} alt="book-image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}