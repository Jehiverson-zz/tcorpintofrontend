import React, { useEffect, useState } from 'react';
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader'
import { salesShow } from '../../../functions/salesFunctions'
import Loading from './img/loading.gif'
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';
import Tablebinnacle from './Tablebinnacle';

import Pagination from '../../../components/pagination';
const DatosdeVenta = () => {
    const [dataSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(80);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let data = {store: localStorage.getItem('store'), type: localStorage.getItem('type')}
        salesShow(data)
            .then((res) =>
            console.log(res),
            )
            .catch(err =>
                setLoading(true)
            )
    }, [])

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataSales.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
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
                <CardHeader title="Tickets" icon="ticket-alt">
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
                        {dataSales.length < 1 ? (<tr><td colSpan="4"><center>No existen datos de venta</center></td></tr>):""}
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={dataSales.length}
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