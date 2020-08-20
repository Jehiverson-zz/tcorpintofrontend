import React, { useEffect,useState } from 'react';
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader'
import { getTicketsSystemTransfer, getStore } from '../../../functions/ticketFunction';
import Select from 'react-select';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBAnimation
} from 'mdbreact';

const TransferSystemPage = () => {
    const [dataStores, setdataSores] = useState(null)

    useEffect(() => {
        getStore().then((res)=>{ setdataSores(res) });
    },[]);
    console.log(dataStores)
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    const value = { value: 'Selecciona una tienda', label: 'Selecciona una tienda' };
    return (
        <Layaout>
            <br></br>
            <CardHeader title="Tickets" icon="ticket-alt">
                <MDBRow style={{ justifyContent: "center", display: "flex" }}>
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
                    <MDBCol md='3' style={{marginTop: "26px"}}>
                        <Select
                            defaultValue={value}
                            options={options}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow style={{ justifyContent: "center", display: "flex" }}>
                    <MDBBtn color='light-blue'><MDBIcon icon="plus"/> Agregar</MDBBtn>
                    <MDBBtn color='light-green'><MDBIcon icon='ticket-alt'/>  Crear Ticket</MDBBtn>
                </MDBRow>
            </CardHeader>
        </Layaout>
    )
}

export default TransferSystemPage;