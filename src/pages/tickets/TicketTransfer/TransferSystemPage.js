import React from 'react';
import Layaout from '../../parcials/Layaout';
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
} from 'mdbreact';

const TransferSystemPage = () => {
    return (
        <Layaout>
            <br></br>
            <MDBContainer>
                <MDBCard>
                    <MDBCardBody>
                        <MDBRow style={{paddingLeft: "12%"}}>
                            <MDBCol md='2'>
                                <MDBInput label='Upc' type='text' validate />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Alu' type='text' validate />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Talla' type='text' validate />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Factura' type='text' validate />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Tiendas' type='text' validate />
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </Layaout>
    )
}

export default TransferSystemPage;