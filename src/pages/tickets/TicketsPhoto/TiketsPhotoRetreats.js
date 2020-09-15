import React, { useState, useEffect } from 'react';
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader';
import {
    storeTicketPhotoRetrats,
    getPhotoRetreats,
    inactivatePhotoRetreats,
    completePhotoRetreats
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
    MDBAlert,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';
import { FaCheck,FaTimes,FaStoreAlt } from 'react-icons/fa'
import Select from 'react-select';
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

const TicketsPhotoRetreats = () => {
    const my_store = JSON.parse(localStorage.getItem("store"));
    const [fields, setFields] = useState([{ upc: null, alu: null, size: null, caurier: null, store_created: my_store }]);
    const [photoRetreats, setphotoRetreats] = useState([]);
    let caurierList = [
        { value: 'Lourdes(Mensajeros)', label: 'Lourdes(Mensajeros)' },
        { value: 'Ricardo Herrera', label: 'Ricardo Herrera' },
        { value: 'Alberto Herrera', label: 'Alberto Herrera' },
        { value: 'Romeo Chávez', label: 'Romeo Chávez' },
    ];

    useEffect(() => {
        get_photo_retreats();
    }, []);

    function get_photo_retreats() {
        getPhotoRetreats().then((res) => setphotoRetreats(res));
        console.log(photoRetreats)
    }

    function result_function(icon, text) {
        Toast.fire({
            icon: icon,
            title: text
        })
    }
    //created input
    function handleChange(i, event, name) {
        const values = [...fields];
        if (name == "caurier") {
            values[i][name] = event.value;
        } else if (event.target.value == "") {
            values[i][name] = null;
        } else {
            values[i][name] = event.target.value;
        }
        setFields(values);
    }

    function crearTicket() {
        storeTicketPhotoRetrats(fields)
            .then(response => {
                get_photo_retreats();
                result_function('success', response.data.message);
            })
            .catch(error => {
                console.log(error)
                result_function('error', "Error al crear el ticket");
            })
    }

    function removeTicket(id) {
        inactivatePhotoRetreats(id).then(response => {
            get_photo_retreats();
            result_function('success', response.data.message);
        })
        .catch(error => {
            console.log(error);
            result_function('error', 'Error al eliminar el ticket');
        })
    }

    function completarTicket(id) {
        completePhotoRetreats(id).then(response => {
            get_photo_retreats();
            result_function('success', response.data.message);
        })
        .catch(error => {
            console.log(error);
            result_function('error', 'Error al completar el ticket');
        })
    }

    function handleAdd() {
        const values = [...fields];
        if (fields.length <= 10) {
            values.push({ upc: null, alu: null, talla: null, factura: null });
            setFields(values);
        } else {
            result_function('warning', 'Alcanzaste el número maximo de alementos')
        }
    }

    function handleRemove(i) {
        if (i !== 0) {
            const values = [...fields];
            values.splice(i, 1);
            setFields(values);
        }
    }

    const value2 = { value: 'Quién lo retira', label: 'Quién lo retira' };

    return (
        <Layaout>
            <br></br>
            <CardHeader title='RETIRO FOTOGRAFÍA' icon="ticket-alt">
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
                                <MDBInput label='Talla' type='text' validate onChange={e => handleChange(idx, e, "size")} />
                            </MDBCol>
                            {idx == 0 && (
                                <MDBCol md='3'>
                                    <label>Persona que lo retira</label>
                                    <Select
                                        onChange={e => handleChange(idx, e, "caurier")}
                                        defaultValue={value2}
                                        options={caurierList}
                                    />
                                </MDBCol>
                            )}
                            {idx !== 0 && (
                            <MDBCol md='1' style={{ paddingLeft: "0px", paddingTop: "20px" }}>
                                <MDBBtn size="sm" color='danger' onClick={() => handleRemove(idx)}>X</MDBBtn>
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
                    photoRetreats.length > 0 ? (
                        photoRetreats.map((data) => {
                            if (data.store_created == my_store) {
                                let orden = 0;
                                return (
                                    <MDBCol md="6" style={{ marginBottom: "15px" }}>
                                        <MDBCard>
                                            <MDBCardBody style={{ Height: "300px" }}>
                                                <MDBCardTitle><span><FaStoreAlt /> {data.store_asigned}</span>
                                                    <MDBBtn className="float-right" size="sm" color='danger' onClick={() => removeTicket(data._id)}><FaTimes style={{fontSize: '15px'}}/></MDBBtn>
                                                <MDBBtn className="float-right" size="sm" color='dark-green' onClick={() => completarTicket(data._id)}><FaCheck style={{fontSize: '15px'}}/></MDBBtn>
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
        </Layaout>)
}

export default TicketsPhotoRetreats;