import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../store/reducers/memberReportsReducer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MemberYearFilter from './MemberYearFilter';
import Designation from './Designation';

const BoardMembersReport = () => {
    const [rows, setRows] = useState()
    let list = [];
    const dispatch = useDispatch()
    const data = useSelector(state => state.memberReport.data)
    const year = useSelector(state => state.filterBoards.year)
    const designation = useSelector(state => state.filterBoards.designation)

    useEffect(() => {
        if (!year && !designation) {
            function getBoardMembers() {
                axios.get("http://localhost:5000/boardMembers/viewMembers").then((res) => {
                    dispatch(setData(res.data))
                }).catch((err) => {
                    alert(err.message);
                    console.log(err.message);
                })
            }
            getBoardMembers()
        }
    }, [year, designation])

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
                dispatch(setData(list))
            })
            .catch((err) => {
                console.log(err);
            });

    }, [year,designation])


    const columns = [
        {
            field: 'boardMemberName',
            headerName: 'Name',
            width: 150,
            editable: false,
        },
        {
            field: 'designation',
            headerName: 'Designation',
            width: 150,
            editable: false,
        },
        {
            field: 'year',
            headerName: 'Year',
            width: 110,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 700,
            editable: false,
        },
    ];

    useEffect(() => {
        data.map((boardMember) => {
            console.log('boardMember', boardMember)
            const { _id: id, boardMemberName, designation, year, description } = boardMember
            list.push({ id, boardMemberName, designation, year, description });
        })
        setRows(list)
    }, [data])

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <div><Box sx={{ height: 500, width: '100%' }}>
            <Container sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={2}>
                        <Designation />
                    </Grid>
                    <Grid item xs={12} md={8} lg={2}>
                        <MemberYearFilter />
                    </Grid>
                </Grid>
            </Container>
            {rows && (
                <DataGrid
                    sx={{
                        mt: 6,
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                    rows={rows}
                    getRowId={(row) => row.id}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            )}
        </Box></div>
    )
}

export default BoardMembersReport