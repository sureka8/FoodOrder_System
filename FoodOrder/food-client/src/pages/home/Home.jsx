import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpacialDish from './SpacialDish'
import Testomoneas from './Testomoneas'
import Services from './Services'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <SpacialDish/>
      <Testomoneas/>
      <Services/>
    </div>
  )
}

export default Home