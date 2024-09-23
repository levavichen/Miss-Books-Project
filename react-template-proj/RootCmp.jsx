const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { BookEdit } from './pages/BookEdit.jsx'

export function App() {

    const [page, setPage] = useState('book')

    function onSetPage(page) {
        setPage(page)
    }

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}