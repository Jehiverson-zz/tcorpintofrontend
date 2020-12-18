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
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pagination from '../../../components/pagination';
const DatosdeVenta = () => {
    const history = useHistory();
    const [dataRetreats, setdataRetreats] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(80);
    const [loading, setLoading] = useState(true);
    const date = new Date();
    const today = `${date.getDate()}_${(date.getMonth() +1)}_${date.getFullYear()}`;
 
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
                {
                    currentPosts.length > 0 && (
                        <div align="right">
                            <ReactHTMLTableToExcel
                                id="exportTableExcel"
                                className="btn btn-success"
                                table="TableTotalRetiros"
                                filename={`Total_Retiros${today}`}
                                sheet={`Total_Retiros${today}`}
                                buttonText="Descargar Excel"
                            />
                        </div>
                    )
                }
                <CardHeader title="Debitos Retiros" icon="ticket-alt">
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