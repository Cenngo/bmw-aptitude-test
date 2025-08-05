import type { ColDef, IDatasource, IGetRowsParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"
import { useCallback, useRef, useState } from "react";
import { CarGridActions } from "./CarGridActions";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDebouncedCallback } from 'use-debounce';
import Grid from "@mui/material/Grid";
import AxiosInstance from "../utils/axios";

export const CarGrid = () => {
    const [search, setSearch] = useState('');

    const dataSource: IDatasource = {
        getRows: async (params: IGetRowsParams) => {
            const query = {
                start: params.startRow,
                end: params.endRow,
                filterModel: params.filterModel ?? {},
                sortModel: params.sortModel ?? {},
                search: search || ''
            }

            AxiosInstance.get<IPagedData<ICar>>(`/cars`, { params: query })
                .then(res => params.successCallback(res.data.items, res.data.totalCount))
                .catch(err => {
                    params.failCallback();
                    console.error("Error fetching data:", err);
                })
        }
    }

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
    const gridRef = useRef<AgGridReact<ICar>>(null)
    
    const debounceSearchChange = useDebouncedCallback((ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(ev.target.value);

        if(gridRef.current?.api) {
            gridRef.current.api.refreshCells();
        }
    }, 300);

    const openDeleteModal = useCallback((id: number) => {
        setSelectedCarId(id);
        setIsDeleteModalOpen(true);
    }, []);

    const handleDelete = useCallback(() => {
        AxiosInstance.delete(`/cars/${selectedCarId}`)
            .then(res => {
                if (res.status === 204) {
                    setIsDeleteModalOpen(false);
                    gridRef.current?.api.refreshCells();
                } else {
                    console.error("Failed to delete car");
                }
            })
            .catch(err => {
                console.error("Error deleting car:", err);
            })
            .finally(() => {
                setIsDeleteModalOpen(false);
            })
    }, [selectedCarId]);

    const [colDefs] = useState<ColDef<ICar>[]>([
        {field: 'brand', headerName: 'Brand', sortable: true, filter: true, cellDataType: 'text', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'contains', 'startsWith', 'endsWith']}},
        {field: 'model', headerName: 'Model', sortable: true, filter: true, cellDataType: 'text', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'contains', 'startsWith', 'endsWith']}},
        {field: 'accelSec', headerName: 'Acceleration (s)', sortable: true, filter: true, cellDataType: 'number', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual']}},
        {field: 'topSpeedKmh', headerName: 'Top Speed (km/h)', sortable: true, filter: true, cellDataType: 'number', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual']}},
        {field: 'rangeKm', headerName: 'Range (km)', sortable: true, filter: true, cellDataType: 'number', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual']}},
        {field: 'efficiencyWhKm', headerName: 'Efficiency (Wh/km)', sortable: true, filter: true, cellDataType: 'number', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual']}},
        {field: 'fastChargeKmH', headerName: 'Fast Charge (km/h)', sortable: true, filter: true, cellDataType: 'number', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual']}},
        {field: 'rapidCharge', headerName: 'Rapid Charge', sortable: true, filter: true, valueFormatter: (params) => params.value ? 'Yes' : 'No', cellDataType: 'boolean', filterParams: {maxNumConditions: 1}},
        {field: 'powerTrain', headerName: 'Power Train', sortable: true, filter: true, cellDataType: 'text', filterParams: {maxNumConditions: 1, filterOptions: ['equals']}},
        {field: 'plugType', headerName: 'Plug Type', sortable: true, filter: true, cellDataType: 'text', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'contains', 'startsWith', 'endsWith']}},
        {field: 'bodyType', headerName: 'Body Type', sortable: true, filter: true, cellDataType: 'text', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'contains', 'startsWith', 'endsWith']}},
        {field: 'segment', headerName: 'Segment', sortable: true, filter: true, cellDataType: 'text', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'contains', 'startsWith', 'endsWith']}},
        {field: 'seats', headerName: 'Seats', sortable: true, filter: true, cellDataType: 'number', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual']}},
        {field: 'priceEuro', headerName: 'Price (€)', sortable: true, filter: true, cellDataType: 'number', filterParams: {maxNumConditions: 1, filterOptions: ['equals', 'lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual']}},
        {field: 'date', headerName: 'Date', sortable: true, filter: true, cellDataType: 'dateTime', valueFormatter: (params) => new Date(params.value).toLocaleDateString(), filterParams: {maxNumConditions: 1}},
        {cellRenderer: CarGridActions, cellRendererParams: {onDeleteClick: openDeleteModal}}
    ]);

    return (
        <>
            <Grid display="flex" justifyContent="center" width="100vw">
                <Grid width="1600px" height="800px">
                    <Box display="flex" justifyContent="flex-start" marginBottom={2} bgcolor="white" borderRadius={2} padding={2}>
                        <TextField id="search" label="Search" variant="filled" color="primary" onChange={debounceSearchChange} size="small"/>
                    </Box>
                    <AgGridReact columnDefs={colDefs} 
                        rowModelType="infinite"
                        datasource={dataSource} 
                        pagination={true} 
                        paginationPageSize={50} 
                        paginationPageSizeSelector={true}
                        paginationAutoPageSize={true}
                        ref={gridRef}
                    />
                </Grid>
            </Grid>
            <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <Grid display="flex" justifyContent="center">
                    <Box bgcolor="white" borderRadius={2} padding={4} boxShadow={24} mt={24}>
                        <Typography color="black" pb={4}>Are you sure you want to delete this car?</Typography>
                        <Button onClick={() => handleDelete()} variant="contained" color="error">Delete</Button>
                        <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                    </Box>
                </Grid>
            </Modal>
        </>
    )
}