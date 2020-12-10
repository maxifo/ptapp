import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';

function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => setTrainings(data.content))
            .catch(err => console.error(err))
    }
    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {
                method: 'DELETE'
            })
                .then(_ => gridRef.current.refreshCells({ rowNodes: getTrainings() }))
                .then(_ => setMsg('Training Was deleted successfully'))
                .then(_ => setOpen(true))
                .catch(err => console.error(err))
        }
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newTraining)
        })
            .then(_ => gridRef.current.refreshCells({ rowNodes: getTrainings() }))
            .catch(err => console.error(err))
    }
    const updateTraining = (link, training) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(_ => gridRef.current.refreshCells({ rowNodes: getTrainings() }))
            .then(_ => setMsg('Training Was updated successfully'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
    }
    const closeSnackbar = () => {
        setOpen(false);
    }
    const columns = [
        { headerName: 'Date', field: 'date', sortable: true, filter: true, },
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },

        {
            headerName: '',
            field: 'links[0].href',
            width: 90,
            cellRendererFramework: params => <EditTraining updateCar={updateTraining} params={params} />
        },
        {
            headerName: '',
            field: 'links[0].href',
            width: 90,
            cellRendererFramework: params => <Button
                color="secondary" size="small" onClick={() => deleteTraining(params.value)}>Delete
         </Button>
        }
    ]
    return (
        <div>
            <AddTraining addTraining={addTraining} />
            <div className="ag-theme-material" style={{ height: '700px', width: '70%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    suppressCellSelection={true}
                    onGridReady={params => {
                        gridRef.current = params.api
                    }}
                    columnDefs={columns}
                    rowData={trainings}
                    pagination={false}
                    paginationPageSize={10}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={closeSnackbar}
                    message={msg}
                />
            </div>
        </div>
    );

}
export default Traininglist;