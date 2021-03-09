import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader'
import { retreatShowList } from '../../../functions/retreatsFunction'
import Loading from './img/loading.gif'
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';
import Tablebinnacle from './listDebt';
import Button from '@material-ui/core/Button';
import ReactExport from "react-export-excel";
import Pagination from '../../../components/pagination';

const DatosdeVenta = () => {
    const history = useHistory();
    const [dataRetreats, setdataRetreats] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(80);
    const [loading, setLoading] = useState(true);
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const date = new Date();
    const today = `${date.getDate()}_${(date.getMonth() +1)}_${date.getFullYear()}`;
    const filename = `DEBITO_RETIROS_${today}`;

    useEffect(() => {
        retreatShowList()
            .then((res) =>
            setdataRetreats(res),
            setLoading(false)
            )
            .catch(err =>
                setLoading(true)
            )
    }, [])

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataRetreats.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (localStorage.getItem('type') !== "admin") {
        history.push(`/retreats`);
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
                <CardHeader title="Debitos Retiros" icon="ticket-alt">
                {
                    currentPosts.length > 0 && (
                        <div align="right">
                            <ExcelFile element={<Button className="btn btn-success text-white">Exportar a Excel</Button>} filename={filename}>
                                <ExcelSheet data={currentPosts} name={filename}>
                                    <ExcelColumn label="Nombre" value="name"/>
                                    <ExcelColumn label="Deuda" value="total_debt"/>
                                    <ExcelColumn label="Fecha Creación" value="date_created"/>
                                    <ExcelColumn label="Fecha Actualización" value="update_created"/>
                                </ExcelSheet>
                            </ExcelFile>
                        </div>
                    )
                }
                    <MDBTable id="TableTotalRetiros">
                        <MDBTableHead>
                            <tr>
                                <th>Nombre</th>
                                <th>Deuda</th>
                                <th>Fecha de Creación</th>
                                <th>Fecha de Actualización</th>
                                <th>Acciones</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <Tablebinnacle posts={currentPosts} loading={loading} />
                        </MDBTableBody>
                        {dataRetreats.length < 1 ? (<tr><td colSpan="4"><center>No existen datos de venta</center></td></tr>):""}
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={dataRetreats.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </MDBTable>
                </CardHeader>
                </>}
        </Layaout>
    )

}
export default DatosdeVenta;