import React, { useState, useEffect } from 'react'

import SearchBar from './SearchBar';
import Container from '@mui/material/Container';
import FilterStatus from './FilterStatus';
import FilterYear from './FilterYear';
import GenerateReports from './GenerateReports';
import AddEvents from './AddEvents';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import EventList from './EventList';
import { useSelector } from 'react-redux';

const EventScheduling = () => {

    const [events, setEvents] = useState([])
    const [toggle, setToggle] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const status = useSelector(state => state.filterEvents.status)
    const year = useSelector(state => state.filterEvents.year)

    useEffect(() => {
        if (!searchTerm && !status && !year) {
            function getEvents() {
                axios.get(`http://localhost:5000/eventScheduling/viewevents`).then((res) => {
                    console.log(res.data)
                    setEvents(res.data)

                }).catch((err) => {
                    alert(err.message);
                    console.log(err.message);
                })
            }
            getEvents()
        }

    }, [toggle, searchTerm, status,year])

    const findEvents = (eventName) => {
        if (eventName) {
            axios.get(`http://localhost:5000/eventScheduling/search/${eventName}`)

                .then((res) => {
                    let arr = res.data;
                    let i;
                    let list = [];
                    for (i = 0; i < arr.length; i++) {
                        list.push(arr[i]);
                    }
                    setEvents(list)
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    };

    useEffect(() => {
        let query
        if (status && year) {
            query = `?eventStatus=${status}&year=${year}`
        }
        else if (status) {
            query = `?eventStatus=${status}`
        }
        else if (year) {
            query = `?year=${year}`
        }
        axios.get(`http://localhost:5000/eventScheduling/filter${query}`)
        .then((res) => {
            console.log(res.data, "res.data")
            let arr = res.data;
            let i;
            let list = [];
            for (i = 0; i < arr.length; i++) {
                list.push(arr[i]);
            }
            setEvents(list)
        })
        .catch((err) => {
            console.log(err);
        });

    }, [status, year])


    return (
        <>
            <Container sx={{ ml: 40 }}>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} findEvents={findEvents} />
            </Container>
            <Container sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={2}>
                        <FilterStatus/>
                    </Grid>
                    <Grid item xs={12} md={8} lg={2}>
                        <FilterYear/>
                    </Grid>
                    <Grid item xs={12} md={8} lg={2}>
                        <GenerateReports />
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "flex-end" }} xs={12} md={8} lg={6}>
                        <AddEvents setToggle={setToggle} toggle={toggle} />
                    </Grid>
                </Grid>
            </Container>
            <EventList events={events} setToggle={setToggle} toggle={toggle} />

        </>
    )
}

export default EventScheduling