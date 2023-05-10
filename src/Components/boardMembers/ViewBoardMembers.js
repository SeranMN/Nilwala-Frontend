import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
// import FilterStatus from './FilterStatus';
import MemberGenerateReport from './MemberGenerateReport';
import AddBoardMembers from './AddBoardMembers';
import Grid from '@mui/material/Grid';
import FilterYear from '../eventScheduling/FilterYear';
import Designation from './Designation';
import axios from 'axios';
import MemberList from './MemberList';
import MemberSearchBar from './MemberSearchBar';
import { useSelector } from 'react-redux';
import MemberYearFilter from './MemberYearFilter';

const ViewBoardMembers = () => {

    const [members, setMembers] = useState([])
    const [toggle, setToggle] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const year = useSelector(state => state.filterBoards.year)
    const designation = useSelector(state => state.filterBoards.designation)


    useEffect(() => {
        if (!searchTerm && !year && !designation) {
            function getBoardMembers() {
                axios.get("http://localhost:5000/boardMembers/viewMembers").then((res) => {
                    console.log(res.data)
                    setMembers(res.data)
                }).catch((err) => {
                    alert(err.message);
                    console.log(err.message);
                })
            }
            getBoardMembers()
        }
    }, [toggle, searchTerm,year,designation])

    const findMembers = (boardMemberName) => {
        if (boardMemberName) {
            axios.get(`http://localhost:5000/boardMembers/search/${boardMemberName}`)

                .then((res) => {
                    let arr = res.data;
                    let i;
                    let list = [];
                    for (i = 0; i < arr.length; i++) {
                        list.push(arr[i]);
                    }
                    setMembers(list)
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    };

    useEffect(() => {
        let query
        if (year && designation) {
            query = `?designation=${designation}&year=${year}`
        }
        else if (year) {
            query = `?year=${year}`
        }
        else if (designation) {
            query = `?designation=${designation}`
        }
        axios.get(`http://localhost:5000/boardMembers/filter${query}`)
            .then((res) => {
                console.log(res.data, "res.data")
                let arr = res.data;
                let i;
                let list = [];
                for (i = 0; i < arr.length; i++) {
                    list.push(arr[i]);
                }
                setMembers(list)
            })
            .catch((err) => {
                console.log(err);
            });

    }, [year,designation])

    return (
        <>
            <Container sx={{ ml: 40 }}>
                <MemberSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} findMembers={findMembers} />
            </Container>
            <Container sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={2}>
                        <Designation />
                    </Grid>
                    <Grid item xs={12} md={8} lg={2}>
                        < MemberYearFilter/>
                    </Grid>
                    <Grid item xs={12} md={8} lg={2}>
                        <MemberGenerateReport />
                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "flex-end" }} xs={12} md={8} lg={6}>
                        <AddBoardMembers toggle={toggle} setToggle={setToggle} />
                    </Grid>
                </Grid>
            </Container>
            <MemberList members={members} toggle={toggle} setToggle={setToggle} />
        </>
    )
}

export default ViewBoardMembers