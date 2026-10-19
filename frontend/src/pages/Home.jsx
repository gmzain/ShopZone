import React from 'react'
import Header from '../component/Header'
import Navbar from '../component/Navbar'
import Carousel from '../component/Carousel'
import Features from '../component/Features'
import Categories from '../component/Categories'
import Products from '../component/Products'
import Hero from '../component/Hero'
import ContactSection from '../component/ContactSection'
import Footer from '../component/Footer'

const Home = () => {
  return (
    <>
      <Header/>
      <Navbar/>
      <Carousel/>   
      <Features/>
      <Categories/>
      <Products/>
      <Hero/>
      <ContactSection/>
    </>
  )
}

export default Home
