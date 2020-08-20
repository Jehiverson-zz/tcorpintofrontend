import React, { useEffect } from 'react';
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader';
import Select from 'react-select';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBAnimation
} from 'mdbreact';

const ImmediateDelivery = () => {

    useEffect(() => {
    }, []);

    return (
        <Layaout>
            <br></br>
            <CardHeader title="Entregas Inmediatas" icon="ticket-alt">
                <MDBRow style={{ justifyContent: "center", display: "flex" }}>
                    <h3>HOLA</h3>
                </MDBRow>
                <MDBRow style={{ justifyContent: "center", display: "flex" }}>
                    <MDBBtn color='light-blue'><MDBIcon icon="plus"/> Agregar</MDBBtn>
                    <MDBBtn color='light-green'><MDBIcon icon='ticket-alt'/>  Crear Ticket</MDBBtn>
                </MDBRow>
            </CardHeader>
        </Layaout>
    )
}

export default ImmediateDelivery;