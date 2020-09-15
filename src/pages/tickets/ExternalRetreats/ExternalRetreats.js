import React, { useState, useEffect } from 'react';
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader';
import {
    storeTicketExternalRetrats,
    inactivateExternalRetreats,
    getExternalRetreats
} from '../../../functions/ticketFunction';

import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';
import { FaTimes, FaCheckDouble, FaPersonBooth } from 'react-icons/fa'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const ExternalRetreats = () => {
    const my_store = JSON.parse(localStorage.getItem("store"));
    const [fields, setFields] = useState([{ person_retreats: null, person_authorizing: null, bill: null, upc: null, alu: null, size: null, store_created: my_store }]);
    const [externalRetreats, setExternalRetreats] = useState([]);

    function result_function(icon, text) {
        Toast.fire({
            icon: icon,
            title: text
        })
    }

    useEffect(() => {
        get_external_retreats();
    }, []);

    function get_external_retreats() {
        getExternalRetreats().then((res) => setExternalRetreats(res.result));
    }
    /* CREAT UN NUEVO TICKET */
    function crearTicket() {
        storeTicketExternalRetrats(fields)
            .then(response => {
                get_external_retreats();
                result_function('success', response.data.message)
            })
            .catch(error => {
                console.log(error)
                result_function('error', 'Algo salió mal')
            })
    }
    /* INACTIVA UN TICKET */
    function removeTicket(id) {
        inactivateExternalRetreats(id)
            .then(response => {
                get_external_retreats();
                result_function('success', response.data.message)
            })
            .catch(error => {
                console.log(error)
                result_function('error', 'Algo salió mal')
            })
    }
    /* OBTIENE LOS VALORES DE LOS INPUTS */
    function handleChange(i, event, name, type) {
        const values = [...fields];
        if (name == "store_asigned") {
            values[i][name] = event.value;
        } else if (event.target.value == "") {
            values[i][name] = null;
        } else {
            values[i][name] = event.target.value;
            setFields(values);
        }
    }
    /* GENERA LOS NUEVOS INPUTS */
    function handleAdd() {
        const values = [...fields];
        if (fields.length <= 10) {
            values.push({ upc: null, alu: null, size: null, bill: null, store_asigned: null, store_created: my_store });
            setFields(values);
        } else {
            result_function('warning', 'Alcanzaste el número maximo de alementos')
        }
    }
    /* ELIMINAR UNA FILA DE INPUTS */
    function handleRemove(i) {
        if (i !== 0) {
            const values = [...fields];
            values.splice(i, 1);
            setFields(values);
        }
    }

    return (
        <Layaout>
            <br></br>
            <CardHeader title='RETIROS EXTERNOS'>
                <MDBRow className="center-element">
                    <MDBCol md='4'>
                        <MDBInput
                            label='Persona que retira'
                            type='text'
                            validate
                            onChange={e => handleChange(0, e, "person_retreats", "text")}
                        />
                    </MDBCol>
                    <MDBCol md='4'>
                        <MDBInput
                            label='Person que autoriza'
                            type='text'
                            validate
                            onChange={e => handleChange(0, e, "person_authorizing")}
                        />
                    </MDBCol>
                    <MDBCol md='4'>
                        <MDBInput
                            label='Factura'
                            type='text'
                            validate
                            onChange={e => handleChange(0, e, "bill")}
                        />
                    </MDBCol>
                </MDBRow>
                {fields.map((field, idx) => {
                    return (
                        <MDBRow id={idx} className="center-element" key={`${field}-${idx}`}>
                            <MDBCol md='3'>
                                <MDBInput
                                    label='Upc'
                                    type='text'
                                    validate onChange={e => handleChange(idx, e, "upc")}
                                />
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBInput
                                    label='Alu'
                                    type='text'
                                    validate onChange={e => handleChange(idx, e, "alu")}
                                />
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBInput
                                    label='Talla'
                                    type='text'
                                    validate onChange={e => handleChange(idx, e, "size")}
                                />
                            </MDBCol>
                            {idx !== 0 && (
                                <MDBCol md='1' style={{ paddingLeft: "0px", paddingTop: "20px" }}>
                                    <MDBBtn
                                        size="sm"
                                        color='danger'
                                        onClick={() => handleRemove(idx)
                                        }>X</MDBBtn>
                                </MDBCol>)}
                        </MDBRow>
                    )
                })}
                <MDBRow className="center-element">
                    <MDBBtn color='light-blue' onClick={() => handleAdd()}><MDBIcon icon="plus" /> Agregar</MDBBtn>
                    <MDBBtn color='light-green' onClick={() => crearTicket()}><MDBIcon icon='ticket-alt' />  Crear Ticket</MDBBtn>
                </MDBRow>
            </CardHeader>
            <br></br>
            <MDBContainer>
                <MDBRow>
                    {
                        externalRetreats.length > 0 ? (
                            externalRetreats.map((data) => {
                                if (data.store_created == my_store) {
                                    let orden = 0;
                                    return (
                                        <MDBCol md="6" style={{ marginBottom: "15px" }}>
                                            <MDBCard>
                                                <MDBCardBody style={{ Height: "300px" }}>
                                                    <MDBCardTitle>
                                                        <span style={{ fontSize: "18px" }}><FaPersonBooth /> {data.name}  </span>
                                                        <span style={{ marginLeft: "10px", fontSize: "18px" }}><FaCheckDouble /> {data.manager}</span>
                                                        <MDBBtn className="float-right" size="sm" color='danger' onClick={() => removeTicket(data._id)}><FaTimes style={{ fontSize: '15px' }} /></MDBBtn>
                                                    </MDBCardTitle>
                                                    <MDBCardText>
                                                        <MDBTable small>
                                                            <MDBTableHead>
                                                                <tr>
                                                                    <th>No.</th>
                                                                    <th>UPC</th>
                                                                    <th>ALU</th>
                                                                    <th>TALLA</th>
                                                                </tr>
                                                            </MDBTableHead>
                                                            <MDBTableBody>
                                                                {
                                                                    data.product.length > 0 ? (
                                                                        data.product.map((prod) => {
                                                                            orden++;
                                                                            return (
                                                                                <tr>
                                                                                    <td>{orden}</td>
                                                                                    <td>{prod.upc}</td>
                                                                                    <td>{prod.alu}</td>
                                                                                    <td>{prod.size}</td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    )
                                                                        :
                                                                        (
                                                                            <tr>
                                                                                <td>{orden}</td>
                                                                                <td>{data.upc}</td>
                                                                                <td>{data.alu}</td>
                                                                                <td>{data.siz}</td>
                                                                            </tr>
                                                                        )
                                                                }
                                                            </MDBTableBody>
                                                        </MDBTable>
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    )
                                }
                            })
                        )
                            :
                            <h4>No hay datos</h4>
                    }
                </MDBRow>
            </MDBContainer>
        </Layaout>
    )
}

export default ExternalRetreats;