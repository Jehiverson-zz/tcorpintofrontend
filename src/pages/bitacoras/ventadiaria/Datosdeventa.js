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
    const [dataSales, setdataSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let data = {store: localStorage.getItem('store')}
        salesShow(data)
            .then((res) =>
            setdataSales(res),
            setLoading(false)
            )
            .catch(err =>
                setLoading(true)
            )
    }, [0])

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
                                <th>Fecha</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <Tablebinnacle posts={currentPosts} loading={loading} />
                        </MDBTableBody>
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