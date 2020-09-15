import React, { useState, useEffect } from 'react';
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader';
import {
    storeTicketsSystemTransfer,
    getTicketsSystemTransferCreated,
    getTicketsSystemTransferAssigned,
    getStore,
    inactivateTicket,
    completeTicket
} from '../../../functions/ticketFunction';
import Pagination from '../../../components/pagination';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
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
import { FaRegPaperPlane,FaStoreAlt } from 'react-icons/fa'
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


const TransferSystemPage = () => {
    const my_store = localStorage.getItem("store");
    const [value, setValue] = useState(0);
    const [dataStores, setdataStores] = useState([]);
    const [dataTicketsCreated, setdataTicketsCreated] = useState([]);
    const [dataTicketsAssigned, setdataTicketsAssigned] = useState([]);
    const [fields, setFields] = useState([{ upc: null, alu: null, size: null, bill: null, store_asigned: null, store_created: my_store }]);
    let storesList = [];

    getStore().then((resp) => { resp.map((x) => storesList.push({ value: x.name, label: x.name })) });

    useEffect(() => {
        tickets_created()
        tickets_asigned()
    }, [0])

    function result_function(icon, text) {
        Toast.fire({
            icon: icon,
            title: text
        })
    }

    function tickets_created() {
        getTicketsSystemTransferCreated().then((res) => setdataTicketsCreated(res));
    }

    function tickets_asigned() {
        getTicketsSystemTransferAssigned().then((res) => setdataTicketsAssigned(res));
    }

    function crearTicket() {
        const values = [...fields];
        console.log(values)
        fields.map(x => {
            console.log(x)
            if (x.upc === null) {
                result_function('error', 'El valor de UPC está vacío');
            } else if (x.alu === null) {
                result_function('error', 'El valor de ALU está vacío');
            } else if (x.size === null) {
                result_function('error', 'Debes ingresar la talla');
            } else if (x.bill === null) {
                result_function('error', 'Ingresa un número de factura');
            }
        })

        if (fields[0]["store_asigned"] === null) {
            result_function('error', 'Debes seleccionar alguna tienda');
        } else {
            storeTicketsSystemTransfer(fields)
                .then((response) => {
                    tickets_created();
                    tickets_asigned();
                    result_function('success', response.data.message);
                }).catch(err => {
                    alert("Error")
                })
        }
    }

    function removeTicket(id) {
        inactivateTicket(id).then((res)=>{
            tickets_created();
            tickets_asigned();
            result_function('success', res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    }

    function completarTicket(id) {
        completeTicket(id).then((res)=>{
            tickets_created();
            tickets_asigned();
            result_function('success', res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    }

    //created input
    function handleChange(i, event, name) {
        const values = [...fields];
        if (name == "store_asigned") {
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
            values.push({ upc: null, alu: null, size: null, bill: null, store_asigned: null, store_created: my_store });
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

    const handleChange2 = (event, newValue) => {
        setValue(newValue);
    };

    const value2 = { value: 'Selecciona una tienda', label: 'Selecciona una tienda' };

    return (
        <Layaout>
            <br></br>
            <CardHeader title="TRASLADO DE SISTEMA" icon="ticket-alt">
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
                            <MDBCol md='2'>
                                <MDBInput label='Factura' type='text' validate onChange={e => handleChange(idx, e, "bill")} />
                            </MDBCol>
                            {idx == 0 && (
                                <MDBCol md='3' style={{ marginTop: "26px" }}>
                                    <Select
                                        onChange={e => handleChange(idx, e, "store_asigned")}
                                        defaultValue={value2}
                                        options={storesList}
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
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange2}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Tickets Creados" {...a11yProps(0)} />
                        <Tab label="Tickets Asignados" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>

                <TabPanel value={value} index={0}>
                    <MDBRow>
                        {
                            dataTicketsCreated.length > 0 ? (
                                dataTicketsCreated.map((data) => {
                                    if (data.store_created == my_store) {
                                        let orden = 0;
                                        return (
                                            <MDBCol md="6" style={{ marginBottom: "15px" }}>
                                                <MDBCard>
                                                    <MDBCardBody style={{ Height: "300px" }}>
                                                        <MDBCardTitle> <span><FaStoreAlt /> {data.store_asigned}</span>
                                                            <MDBBtn className="float-right" size="sm" color='danger' onClick={() => removeTicket(data._id)}>X</MDBBtn>
                                                        </MDBCardTitle>
                                                        <MDBCardText>
                                                            <MDBTable small>
                                                                <MDBTableHead>
                                                                    <tr>
                                                                        <th>No.</th>
                                                                        <th>UPC</th>
                                                                        <th>ALU</th>
                                                                        <th>TALLA</th>
                                                                        <th>FACTURA</th>
                                                                    </tr>
                                                                </MDBTableHead>
                                                                <MDBTableBody>
                                                                    {data.product.map((prod) => {
                                                                        orden++;
                                                                        return (
                                                                            <tr>
                                                                                <td>{orden}</td>
                                                                                <td>{prod.upc}</td>
                                                                                <td>{prod.alu}</td>
                                                                                <td>{prod.size}</td>
                                                                                <td>{prod.bill}</td>
                                                                            </tr>
                                                                        )
                                                                    })}
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

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MDBRow>
                        {
                            dataTicketsAssigned.length > 0 ? (
                                dataTicketsAssigned.map((data) => {
                                    if (data.store_asigned == my_store) {
                                        let orden = 0;
                                        return (
                                            <MDBCol md="6" style={{ marginBottom: "15px" }}>
                                                <MDBCard>
                                                    <MDBCardBody>
                                                        <MDBCardTitle><span><FaStoreAlt /> {data.store_created}</span>
                                                            <MDBBtn className="float-right" size="sm" color='dark-green' onClick={() => completarTicket(data._id)}>
                                                                <FaRegPaperPlane style={{fontSize: '15px'}}/>
                                                            </MDBBtn>
                                                        </MDBCardTitle>
                                                        <MDBCardText>
                                                            <MDBTable small>
                                                                <MDBTableHead>
                                                                    <tr>
                                                                        <th>No.</th>
                                                                        <th>Upc</th>
                                                                        <th>Alu</th>
                                                                        <th>Talla</th>
                                                                        <th>Factura</th>
                                                                    </tr>
                                                                </MDBTableHead>
                                                                {data.product.map((prod) => {
                                                                    orden++;
                                                                    return (
                                                                        <MDBTableBody>
                                                                            <tr>
                                                                                <td>{orden}</td>
                                                                                <td>{prod.upc}</td>
                                                                                <td>{prod.alu}</td>
                                                                                <td>{prod.size}</td>
                                                                                <td>{prod.bill}</td>
                                                                            </tr>
                                                                        </MDBTableBody>
                                                                    )
                                                                })}
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
                </TabPanel>


            </MDBContainer>
            <br></br>
        </Layaout>
    )
}

export default TransferSystemPage;