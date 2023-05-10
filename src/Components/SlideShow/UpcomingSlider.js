import React, { useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';
const UpcomingSlider = () => {
    const [events, setEvents] = useState([]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };
    React.useEffect(() => {
        axios.get(`http://localhost:5000/eventScheduling/filter?eventStatus=Publish`)
            .then((res) => {
                console.log(res.data, "res.data")
                setEvents(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

  return (
      <div>
          <Slider {...settings}>
              {events.map((event) => {
                  <div >
                  <img src="/1b.jpg" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
              </div>
})}
             
              
          </Slider>
      </div>
  )
}

export default UpcomingSlider