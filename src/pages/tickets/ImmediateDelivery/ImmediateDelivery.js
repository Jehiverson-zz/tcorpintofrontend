import React, { useEffect, useState } from 'react';
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader';
import {
    storeTicketInmediates,
    getStore,
} from '../../../functions/ticketFunction';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBAnimation
} from 'mdbreact';
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

const ImmediateDelivery = () => {
    const my_store = localStorage.getItem("store");
    const [fields, setFields] = useState([
        {
            store_asigned: null,
            store_created: my_store,
            encargado: 'lourdes@corpinto.com',
            cliente: null,
            bill: null,
            direccion: null,
            celular1: null,
            celular2: null,
            horario: null,
            total: null,
            image: null,
            upc: null,
            alu: null,
            size: null
        }]);
    const storesList = [];

    getStore().then((resp) => { resp.map((x) => storesList.push({ value: x.name, label: x.name })) });
    useEffect(() => {
    }, []);

    function crearTicket(e) {
        e.preventDefault();
        console.log("antes de mandarlo", fields)
        storeTicketInmediates(fields)
            .then((response) => {
                alert("Creado")
            }).catch(err => {
                alert("Error")
            })
    }

    function result_function(icon, text) {
        Toast.fire({
            icon: icon,
            title: text
        })
    }

    function handleChange1(event, name) {
        const values = [...fields];
        if (name == "store_asigned" || name == "encargado") {
            values[0][name] = event.value;
        } else if (name == "image") {
            let data = new FormData()
            data.append('params', event.target.files[0])
            values[0][name] = data;
        } else {
            console.log(event.target)
            values[0][name] = event.target.value;
        }
        setFields(values);
        console.log(fields);
    }

    function handleChange2(i, event, name) {
        const values = [...fields];
        if (name == "store_asigned" || name == "encargado") {
            values[i][name] = event.value;
        } else if (event.target.value == "") {
            values[i][name] = null;
        } else {
            values[i][name] = event.target.value;
        }
        setFields(values);
        console.log(fields);
    }

    /* Crea los nuevs inputs */
    function handleAdd(e) {
        e.preventDefault();
        const values = [...fields];
        if (fields.length <= 10) {
            values.push({ upc: null, alu: null, size: null });
            setFields(values);
        } else {
            alert("Se alconzó el limite de tickets por creación")
        }
    }

    /* Eliminar inputs */
    function handleRemove(i) {
        if (i !== 0) {
            const values = [...fields];
            values.splice(i, 1);
            setFields(values);
        }
    }

    const default_store = { value: 'Selecciona una tienda', label: 'Selecciona una tienda' };
    const default_encargado = { value: 'lourdes@corpinto.com', label: 'Lourdes' };
    return (
        <Layaout>
            <br></br>
            <CardHeader title="Entregas Inmediatas" icon="ticket-alt">
            <form>
                <MDBRow className="center-element">
                    <MDBCol md='3' >
                        <label>Tienda</label>
                        <Select
                            onChange={e => handleChange1(e, "store_asigned")}
                            defaultValue={default_store}
                            options={storesList}
                        />
                    </MDBCol>
                    <MDBCol md='3'>
                        <MDBInput label='Cliente' type='text' validate onChange={e => handleChange1(e, "cliente")}/>
                    </MDBCol>
                    <MDBCol md='3'>
                        <MDBInput label='Factura' type='text' validate onChange={e => handleChange1(e, "bill")}/>
                    </MDBCol>
                    <MDBCol md='3'>
                        <MDBInput label='Direccion' type='text' validate onChange={e => handleChange1(e, "direccion")}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md='2'>
                        <MDBInput label='Calular 1' type="text" validate onChange={e => handleChange1(e, "celular1")}/>
                    </MDBCol>
                    <MDBCol md='2'>
                        <MDBInput label='Calular 2' type="text" validate onChange={e => handleChange1(e, "celular2")}/>
                    </MDBCol>
                    <MDBCol md='2'>
                        <MDBInput label='Horario' type="text" validate onChange={e => handleChange1(e, "horario")}/>
                    </MDBCol>
                    <MDBCol md='2'>
                        <MDBInput label='Total a Pagar' type="text" validate onChange={e => handleChange1(e, "total")}/>
                    </MDBCol>
                    <MDBCol md='4'>
                        <MDBInput type="file" accept="image/png, image/jpeg" validate onChange={e => handleChange1(e, "image")}/>
                    </MDBCol>
                </MDBRow>
                {fields.map((field, idx) => {
                    return (
                        <MDBRow className="center-element" key={`${field}-${idx}`}>
                            <MDBCol md='3'>
                                <MDBInput label='UPC' type="text" validate onChange={e => handleChange2(idx, e, "upc")}/>
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBInput label='ALU' type="text" validate onChange={e => handleChange2(idx, e, "alu")}/>
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBInput label='TALLA' type="text" validate onChange={e => handleChange2(idx, e, "size")}/>
                            </MDBCol>
                            <MDBCol md='1' style={{ paddingLeft: "0px", paddingTop: "20px" }}>
                                {idx !== 0 && (<MDBBtn size="sm" color='danger' onClick={() => handleRemove(idx)}>X</MDBBtn>)}
                            </MDBCol>
                        </MDBRow>
                    )
                })}
                <MDBRow className="center-element">
                    <MDBBtn color='light-blue' onClick={(e) => handleAdd(e)}><MDBIcon icon="plus" /> Agregar</MDBBtn>
                    <MDBBtn color='light-green' onClick={(e) => crearTicket(e)}><MDBIcon icon='ticket-alt' />  Crear Ticket</MDBBtn>
                </MDBRow>
                </form>
            </CardHeader>
        </Layaout>
    )
}

export default ImmediateDelivery;