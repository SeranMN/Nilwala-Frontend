import React from 'react'
import Header from './Header'
import HomeBanner from './HomeBanner'
import HomeCards from './HomeCard'
import EventContainer from './EventContainer'
import Divider from '@mui/material/Divider';
import Countup from './Countup'
import Loader from './PreLoader/Loader'

const Home = () => {
  return (
    <div style={{overflow:'clip'}}>
        <Loader/>
        <HomeBanner/>
        <HomeCards/>
        <Divider/>
        <Countup/>
        <EventContainer/>
    </div>
  )
}

export default Home