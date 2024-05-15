import React, {useEffect, useState} from "react";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from "react-router-dom";
import useCargosData from "../hooks/useCargosData";
import ButtonsGroup from "../components/ButtonsGroup";
import AlertWindow from "../components/AlertWindow";
import * as pages from "../../../constants/pages";
import Filter from '../components/Filter'
import pageURLs from "../../../constants/pagesURLs";
import {fetchCargosSuccess, updateCurrentRowId, updatePageNumber, updateRowsPerPage} from "../actions/cargo";
import {useIntl} from "react-intl";

const columns = [
    {id: "id", label: "№", minWidth: 10, align: "center"},
    {id: "description", label: "Cargo description", minWidth: 200, align: "center",},
    {id: "status", label: "Delivery Status", minWidth: 200, align: "center"},
    {id: "vehicleNumber", label: "Vehicle number", minWidth: 50, align: "center",},
    {id: "type", label: "Vehicle type", minWidth: 50, align: "center"},];

function CargosList() {
    const dispatch = useDispatch();
    const {getCargos, deleteCargoById} = useCargosData();
    const [showFilters, setShowFilters] = useState(() => {
        return JSON.parse(localStorage.getItem("showFilters")) || false;
    });
    const [openAlert, setShowAlert] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(null);
    const rowsPerPage = useSelector((state) => state.cargoReducer.rowsPerPage);
    const pageNumber = useSelector((state) => state.cargoReducer.pageNumber);
    const cargosList = useSelector((state) => state.cargoReducer.cargos);
    const deleteStateSuccess = useSelector((state) => state.cargoReducer.deleteStateSuccess);
    const cargoId = useSelector((state) => state.cargoReducer.currentRowId);

    useEffect(() => {
        const savedPagination = JSON.parse(
            localStorage.getItem('pagination')) || { page: 0, rowsPerPage: 10 };
        dispatch(updatePageNumber(savedPagination.page));
        dispatch(updateRowsPerPage(savedPagination.rowsPerPage));

        getCargos().then((cargos) => {
            dispatch(fetchCargosSuccess(cargos))
        });

        getCargos();
    }, [dispatch, getCargos]);

    const handleDeleteIconClick = async (id) => {
        setShowAlert(true);
    };

    const handleConfirmDelete = async () => {
        await deleteCargoById(cargoId);
        const updatedCargosList = await getCargos();
        dispatch(fetchCargosSuccess(updatedCargosList));
    };

    const handleMouseEnter = (id) => {
        setShowDeleteButton(id);
    };

    const handleMouseLeave = () => {
        setShowDeleteButton(null);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleRowClick = (id) => {
        dispatch(updateCurrentRowId(id));
    };

    const handleFilterClick = async () => {
        setShowFilters(!showFilters);
        localStorage.setItem("showFilters", JSON.stringify(!showFilters));
    };

    const handleChangePage = (event, newPage) => {
        dispatch(updatePageNumber(newPage));
        localStorage.setItem('pagination', JSON.stringify({ page: newPage, rowsPerPage }));
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = event.target.value;
        dispatch(updateRowsPerPage(newRowsPerPage));
        dispatch(updatePageNumber(0));
        localStorage.setItem('pagination', JSON.stringify({ page: 0, rowsPerPage: newRowsPerPage }));
    };

    return (<Paper sx={{width: "100%", overflow: "hidden"}}>
        <ButtonsGroup onFilterClick={handleFilterClick} showFilters={showFilters} />
        <TableContainer sx={{maxHeight: 800}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{minWidth: column.minWidth}}
                            >
                                {column.label}
                            </TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cargosList.list && cargosList.list.map((row) => (<TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        onMouseEnter={() => handleMouseEnter(row.id)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleRowClick(row.id)}
                    >
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (<TableCell
                                key={`${row.id}-${column.id}`}
                                align={column.align}
                            >
                                {column.id === "description" && (
                                    <Link
                                        to={`${pageURLs[pages.cargosList]}/${row.id}`}
                                    >
                                        {value}
                                    </Link>)}

                                {!(column.id === "description") && value}
                            </TableCell>);
                        })}
                        <TableCell
                            sx={{
                                minWidth: columns[columns.length - 1].minWidth, padding: "0px",
                            }}
                        >
                            {showDeleteButton === row.id && (
                                <Tooltip title="Delete">
                                <IconButton
                                    aria-label="delete"
                                    size="small"
                                    onClick={() => handleDeleteIconClick(row.id)}
                                >
                                    <DeleteIcon fontSize="inherit"/>
                                </IconButton>
                            </Tooltip>)}
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100, 500]}
            component="div"
            count={cargosList ? cargosList.totalPages * rowsPerPage : 0}
            rowsPerPage={rowsPerPage}
            page={pageNumber}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {showFilters && <Filter showFilters={showFilters} />}
        <AlertWindow
            openAlert={openAlert}
            handleClose={handleCloseAlert}
            isDeleted={deleteStateSuccess}
            handleConfirmDelete={handleConfirmDelete}
        />
    </Paper>);
}

export default CargosList;
