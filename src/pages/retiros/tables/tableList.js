import React, { useEffect, useState } from 'react';
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

import Pagination from '../../../components/pagination';
const DatosdeVenta = () => {
    const [dataRetreats, setdataRetreats] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(80);
    const [loading, setLoading] = useState(true);

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
                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>Nombre</th>
                                <th>Deuda</th>
                                <th>Fecha de Creació</th>
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