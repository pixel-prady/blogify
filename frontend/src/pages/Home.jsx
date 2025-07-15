import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import Bloglist from '../components/Bloglist'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

function Home() {
    return (
        <>
            <NavBar />
            <Header />
            <Bloglist />
            <Newsletter />
            <Footer />
        </>

    )
}

export default Home