import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../store/reducers/reportsReducer';
import SearchBar from './SearchBar';
import Container from '@mui/material/Container';
import FilterStatus from './FilterStatus';
import FilterYear from './FilterYear';
import GenerateReports from './GenerateReports';
import AddEvents from './AddEvents';
import Grid from '@mui/material/Grid';
import FilterMonth from './FilterMonth';

const EventReports = () => {

    const [rows, setRows] = useState()
    let list = [];
    const status = useSelector(state => state.filterEvents.status)
    const year = useSelector(state => state.filterEvents.year)
    const month = useSelector(state => state.filterEvents.month)

    const dispatch = useDispatch()
    const data = useSelector(state => state.report.data)
    const formatTime = (time) => {
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    useEffect(() => {
        if (!status && !year && !month) {
            function getEvents() {
                axios.get(`http://localhost:5000/eventScheduling/viewevents`).then((res) => {
                    dispatch(setData(res.data))

                }).catch((err) => {
                    alert(err.message);
                    console.log(err.message);
                })
            }
            getEvents()
        }
    }, [status, year, month])

    useEffect(() => {
        console.log('month',month)
        let query
        if (status !== 'Cancel') {
            if (status && year && month) {
                query = `?eventStatus=${status}&year=${year}&month=${month}`
            }
            else if (status && year) {
                query = `?eventStatus=${status}&year=${year}`
            }
            else if (status && month) {
                query = `?eventStatus=${status}&month=${month}`
            }
            else if (year && month) {
                query = `?year=${year}&month=${month}`
            }
            else if (status) {
                query = `?eventStatus=${status}`
            }
            else if (year) {
                query = `?year=${year}`
            }
            else if (month) {
                query = `?month=${month}`
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
                    dispatch(setData(list))
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else if (status == "Cancel") {
            axios.get(`http://localhost:5000/eventScheduling/vieweCancelledEvents`)
            .then((res) => {
                console.log(res.data)
                dispatch(setData(res.data))
            })
            .catch((err) => {
                console.log(err);
            });
        }

    }, [status, year,month])

    useEffect(() => {
        data.map((event) => {
            const { _id: id, eventName, eventStatus, date, time, description } = event
            let formattedDate = (new Date(date).getMonth() + 1) + '/' + (new Date(date).getDate()) + '/' + (new Date(date).getFullYear())
            let formattedTime = formatTime(new Date(time))
            list.push({ id, eventName, eventStatus, formattedDate, formattedTime, description });
        })
        setRows(list)
    }, [data])

    const columns = [
        {
            field: 'eventName',
            headerName: 'Event name',
            width: 150,
            editable: false,
        },
        {
            field: 'eventStatus',
            headerName: 'Event status',
            width: 150,
            editable: false,
        },
        {
            field: 'formattedDate',
            headerName: 'Date',
            width: 150,
            editable: false,
        },
        {
            field: 'formattedTime',
            headerName: 'Time',
            width: 110,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 540,
            editable: false,
        },
    ];

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
                        <FilterStatus report="report" />
                    </Grid>
                    <Grid item xs={12} md={8} lg={2}>
                        <FilterYear />
                    </Grid>
                    <Grid item xs={12} md={8} lg={2}>
                        <FilterMonth />
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

export default EventReports