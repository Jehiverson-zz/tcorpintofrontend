import React from 'react'
import Navbar from '../../parcials/Layaout'
import SectionContainer from '../../../components/sectionContainer';

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBCard,
    MDBCardBody,
    MDBModal,
    MDBModalBody,
    MDBModalFooter
  } from 'mdbreact';

const Ventadiaria = () =>{

    return(
    <Navbar>
        <SectionContainer header='Venta Diaria' noBorder>
        <MDBRow>
            <MDBCol md='6'>
            </MDBCol>
        </MDBRow>
        </SectionContainer>
    </Navbar>
    )

}

export default Ventadiaria