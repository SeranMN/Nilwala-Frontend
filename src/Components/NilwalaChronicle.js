import React from 'react'
// import Header from './Header'
import HomeBanner from './HomeBanner'
import HomeCards from './HomeCard'
// import EventContainer from './EventContainer'
import Divider from '@mui/material/Divider';
import Countup from './Countup'
// import Loader from './PreLoader/Loader'

function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

const Home = () => {

  const iframe2 = '<iframe style="width:90vw;height:90vh" src="https:anyflip.com/bookcase/mcenl/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe>'

  return (
    <div style={{overflow:'clip'}}>
        {/* <iframe style="width:90vw;height:90vh" src="https:anyflip.com/bookcase/mcenl/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe> */}
        <Iframe iframe={iframe2} allow="autoplay" />



        {/* <HomeBanner/> */}
        {/* <HomeCards/> */}
        {/* <Divider/> */}
        {/* <Countup/> */}
        {/* <EventContainer/> */}
    </div>
  )
}

export default Home