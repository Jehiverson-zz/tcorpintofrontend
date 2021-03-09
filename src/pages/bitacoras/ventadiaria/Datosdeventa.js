import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader'
import { salesShow } from '../../../functions/salesFunctions'
import Loading from './img/loading.gif'
import {
    MDBRow,
    MDBCol,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from 'mdbreact';
import Tablebinnacle from './Tablebinnacle';
import Select from 'react-select';
import Pagination from '../../../components/pagination';
import ReactExport from "react-export-excel";
import Button from '@material-ui/core/Button';

const DatosdeVenta = () => {
    const history = useHistory();
    const [dataSales, setDataSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    const [loading, setLoading] = useState(true);
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const date = new Date();
    const today = `${date.getDate()}_${(date.getMonth() +1)}_${date.getFullYear()}`;
    const filename = `Venta_Diaria_${today}`;

    useEffect(() => {
        let data = {store: localStorage.getItem('store'), type: localStorage.getItem('type')}
        salesShow(data)
            .then((res) =>{
            setLoading(false)
            setDataSales(res)
        }
            )
            .catch(err =>
                console.log(err),
                setLoading(true)
            )
    }, [])

    const value2 = { value: 'Selecciona una tienda', label: 'Selecciona una tienda' };

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataSales.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (localStorage.getItem('session') !== "true") {
        history.push(`/`);
    }

    return (
        <Layaout>
            { loading ?
                (<center> <img
                    alt='Preload'
                    className='img-fluid'
                    src={Loading}
                /></center>)
                : 
                <>
                <br></br>
                <CardHeader title="Datos de venta" icon="ticket-alt">
                    {
                    currentPosts.length > 0 && (
                        <div align="right">
                            <ExcelFile element={<Button className="btn btn-success text-white">Exportar a Excel</Button>} filename={filename}>
                                <ExcelSheet data={dataSales} name={filename}>
                                    <ExcelColumn label="Venta" value="ventas"/>
                                    <ExcelColumn label="Meta" value="metas"/>
                                    <ExcelColumn label="Encargado" value="manager"/>
                                    <ExcelColumn label="Tienda" value="tienda"/>
                                    <ExcelColumn label="Fecha Creación" value="fechaCreacion"/>
                                </ExcelSheet>
                            </ExcelFile>
                        </div>
                    )
                    }
                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>Venta</th>
                                <th>Meta</th>
                                <th>Encargado</th>
                                <th>Tienda</th>
                                <th>Fecha</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <Tablebinnacle posts={currentPosts} loading={loading} />
                        </MDBTableBody>
                        {dataSales.length < 1 ? (<tr><td colspan="4"><center>No existen datos de venta</center></td></tr>):""}
                    </MDBTable>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={dataSales.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                </CardHeader>
                </>}
        </Layaout>
    )

}
export default DatosdeVenta;