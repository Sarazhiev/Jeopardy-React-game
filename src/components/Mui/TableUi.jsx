import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllPlayers, saveTotalValue, saveUserName} from "../../redux/modal";
import ButtonUi from "./Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




const TableUi = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {modal} = useSelector(state => state)
    const {allPlayers} = modal
    const {userName} = modal




    useEffect(() => {
        if (!userName) {
            navigate('/')
        }
    }, [userName])


    const exitHandler = () => {
        navigate('/')
        localStorage.removeItem('user')
        dispatch(saveTotalValue(''))
    }
    const playAgainHandler = () => {
        navigate('/game')
    }


    // const endGameHandler = () => {
    //     dispatch(getAllPlayers({name: userName, answerTotal: answerTotal}))
    //     navigate('/statistics');
    // };
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>№</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Total Values</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allPlayers && allPlayers.map((row, index) =>  (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row" align='center'>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.answerTotal}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{justifyContent: 'center', display: 'flex', columnGap: '20px', marginTop: '20px'}}>
                {/*<ButtonUi  onClick={playAgainHandler} children={'Продолжить игру'}/>*/}
                <ButtonUi style={{background: 'red'}}  onClick={exitHandler} children={'Выйти'}/>
            </div>
        </>
    );
}
export default TableUi