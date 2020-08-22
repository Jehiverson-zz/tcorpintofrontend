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
    const [dataStores, setdataSores] = useState([]);
    const [fields, setFields] = useState([{ upc: null, alu: null, siz: null, invoice: null,store: null }]);
    let datos = [];

    getStore().then((res)=>{ _data(res)});

    let _data = (stores) =>{
         stores.map(res=> datos.push({value:res.name, label:res.name}))
    }

    //created input
    function handleChange(i, event, name) {
        const values = [...fields];
        if(event.target.value == ""){
            values[i][name] = null;
        }else{
            values[i][name] = event.target.value;
        }
        setFields(values);
      }

      function handleAdd() {
        const values = [...fields];
        values.push({ upc: null, alu: null, siz: null, invoice: null,store: null });
        setFields(values);
      }

      function handleRemove(i) {
          if(i !== 0){
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
                    
                <MDBRow id={idx} style={{ justifyContent: "center", display: "flex" }} key={`${field}-${idx}`}>
                    <MDBCol md='2'>
                        <MDBInput label='Upc' type='text' validate onChange={e => handleChange(idx, e, "upc")}/>
                    </MDBCol>
                    <MDBCol md='2'>
                        <MDBInput label='Alu' type='text' validate onChange={e => handleChange(idx, e, "alu")}/>
                    </MDBCol>
                    <MDBCol md='2'>
                        <MDBInput label='Talla' type='text' validate onChange={e => handleChange(idx, e, "siz")}/>
                    </MDBCol>
                    <MDBCol md='2'>
                        <MDBInput label='Factura' type='text' validate onChange={e => handleChange(idx, e, "invoice")}/>
                    </MDBCol>
                    <MDBCol md='3' style={{marginTop: "26px"}}>
                        <Select
                            onChange={e => handleChange(idx, e, "store")}
                            defaultValue={value}
                            options={datos}
                        />
                    </MDBCol>
                    <MDBCol md='1' style={{paddingLeft: "0px",paddingTop: "20px"}}>
                        {idx!==0&&(<MDBBtn size="sm" color='danger' onClick={() => handleRemove(idx)}>X</MDBBtn>)}
                    </MDBCol>
                </MDBRow>
                )})}
                <MDBRow style={{ justifyContent: "center", display: "flex" }}>
                    <MDBBtn color='light-blue' onClick={() => handleAdd()}><MDBIcon icon="plus"/> Agregar</MDBBtn>
                    <MDBBtn color='light-green'><MDBIcon icon='ticket-alt'/>  Crear Ticket</MDBBtn>
                </MDBRow>
            </CardHeader>
        </Layaout>
    )
}

export default TransferSystemPage;