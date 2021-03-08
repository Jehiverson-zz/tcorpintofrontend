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
    MDBTableHead
} from 'mdbreact';
import Tablebinnacle from './Tablebinnacle';
import Select from 'react-select';
import Pagination from '../../../components/pagination';
const DatosdeVenta = () => {
    const history = useHistory();
    const [dataSales, setDataSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let data = { store: localStorage.getItem('store'), type: localStorage.getItem('type') }
        salesShow(data)
            .then((res) => {
                //console.log({ store: localStorage.getItem('store'), type: localStorage.getItem('type') }, res);
                setLoading(false)
                setDataSales(res)
            }
            )
            .catch(err =>
                console.log(err),
                //setLoading(true)
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
                            {dataSales.length < 1 ? (<tr><td colspan="4"><center>No existen datos de venta</center></td></tr>) : ""}
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