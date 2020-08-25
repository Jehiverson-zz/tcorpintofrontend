import React, { useEffect, useState } from 'react';
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader'
import { storeTicketsSystemTransfer, getTicketsSystemTransfer, getStore } from '../../../functions/ticketFunction';
import Select from 'react-select';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBAnimation,
    MDBContainer,
    MDBTypography,
    MDBCard,
    MDBCardBody
} from 'mdbreact';

const TransferSystemPage = () => {
    const [dataStores, setdataSores] = useState([]);
    const [fields, setFields] = useState([{ upc: null, alu: null, talla: null, factura: null, store: null }]);
    let storesList = [];
    let ticketsList = [];

    getTicketsSystemTransfer().then((resp) => { resp.map(res => ticketsList.push(res)); console.log(ticketsList)});
    getStore().then((resp) => { resp.map(res => storesList.push({ value: res.name, label: res.name })) });

    function crearTicket() {
        alert("Creado")
        storeTicketsSystemTransfer(fields).then(response => {
            console.log(response)
        }).catch(err => {
            alert("Error")
        })
    }

    //created input
    function handleChange(i, event, name) {
        const values = [...fields];
        if (name == "store") {
            values[i][name] = event.value;
        } else if (event.target.value == "") {
            values[i][name] = null;
        } else {
            values[i][name] = event.target.value;
        }
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        if (fields.length <= 10) {
            values.push({ upc: null, alu: null, talla: null, factura: null });
            setFields(values);
        } else {
            alert("Se alconzó el limite de tickets por creación")
        }
    }

    function handleRemove(i) {
        if (i !== 0) {
            const values = [...fields];
            values.splice(i, 1);
            setFields(values);
        }
    }

    const value = { value: 'Selecciona una tienda', label: 'Selecciona una tienda' };
    return (
        <Layaout>
            <br></br>
            <CardHeader title="Tickets" icon="ticket-alt">
                {fields.map((field, idx) => {
                    return (
                        <MDBRow id={idx} className="center-element" key={`${field}-${idx}`}>
                            <MDBCol md='2'>
                                <MDBInput label='Upc' type='text' validate onChange={e => handleChange(idx, e, "upc")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Alu' type='text' validate onChange={e => handleChange(idx, e, "alu")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Talla' type='text' validate onChange={e => handleChange(idx, e, "talla")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Factura' type='text' validate onChange={e => handleChange(idx, e, "factura")} />
                            </MDBCol>
                            <MDBCol md='3' style={{ marginTop: "26px" }}>
                                <Select
                                    onChange={e => handleChange(idx, e, "store")}
                                    defaultValue={value}
                                    options={storesList}
                                />
                            </MDBCol>
                            <MDBCol md='1' style={{ paddingLeft: "0px", paddingTop: "20px" }}>
                                {idx !== 0 && (<MDBBtn size="sm" color='danger' onClick={() => handleRemove(idx)}>X</MDBBtn>)}
                            </MDBCol>
                        </MDBRow>
                    )
                })}
                <MDBRow className="center-element">
                    <MDBBtn color='light-blue' onClick={() => handleAdd()}><MDBIcon icon="plus" /> Agregar</MDBBtn>
                    <MDBBtn color='light-green' onClick={() => crearTicket()}><MDBIcon icon='ticket-alt' />  Crear Ticket</MDBBtn>
                </MDBRow>
            </CardHeader>
            <br></br>

            <MDBRow>
                <MDBCol md='6' className="center-element">
                    <MDBTypography tag="h3" variant="h3-responsive"> Tickets Creados </MDBTypography>
                </MDBCol>
                <MDBCol md='6' className="center-element">
                    <MDBTypography tag="h3" variant="h3-responsive"> Tickets Asignados </MDBTypography>
                </MDBCol>
            </MDBRow>
            <br></br>
            <MDBRow>
                <MDBCol md="6">
                    <MDBContainer>
                        <MDBCard>
                            <MDBCardBody>
                                CREADOS
                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                </MDBCol>
                <MDBCol md="6">
                    <MDBContainer>
                        <MDBCard>
                            <MDBCardBody>
                                ASINGNADOS
                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            <br></br>
        </Layaout>
    )
}

export default TransferSystemPage;