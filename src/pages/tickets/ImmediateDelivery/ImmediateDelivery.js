import React, { useEffect, useState } from 'react';
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader';
import {
    storeTicketInmediates,
    getTicketsImmediatesDeliveriesCreated,
    getTicketsImmediatesDeliveriesAssigned,
    completeTicketInmediates,
    inactivateTicketInmediates,
    getStore,
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
    MDBTableHead, MDBTypography
} from 'mdbreact';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Moment from 'react-moment';
import { FaStoreAlt, FaCheck, FaTimes, FaRegCalendar } from 'react-icons/fa'
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

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const ImmediateDelivery = () => {
    const my_store = localStorage.getItem("store");
    const [value, setValue] = useState(0);
    const [dataTicketsImmediatesCreated, setdataTicketsImmeditaesCreated] = useState([]);
    const [dataTicketsImmediatesAssigned, setdataTicketsImmeditaesAssigned] = useState([]);
    const [fields, setFields] = useState([
        {
            store_asigned: null,
            store_created: my_store,
            encargado: 'lourdes@corpinto.com',
            client: null,
            bill: null,
            address: null,
            phone1: null,
            phone2: null,
            hours: null,
            total: null,
            image: null,
            upc: null,
            alu: null,
            size: null
        }]);
        const [fileInfos, setFileInfos] = useState([]);
    const storesList = [];

    getStore().then((resp) => { resp.map((x) => storesList.push({ value: x.name, label: x.name })) });
    useEffect(() => {
        getTicketsAssigned();
        getTicketsCreated();
    }, []);

    function result_function(icon, text) {
        Toast.fire({
            icon: icon,
            title: text
        })
    }

    function getTicketsCreated() {
        getTicketsImmediatesDeliveriesCreated()
            .then((response) => {
                console.log("CREATED: ", response)
                setdataTicketsImmeditaesCreated(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getTicketsAssigned() {
        getTicketsImmediatesDeliveriesAssigned()
            .then((response) => {
                console.log("ASSIGNED: ", response)
                setdataTicketsImmeditaesAssigned(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function crearTicket(e) {
        e.preventDefault();
        let cont = 0;
        fields.some(function (x, i) {
            if (x.upc === null) {
                result_function('error', 'El valor de UPC está vacío');
                cont++;
                return true;
            } else if (x.alu === null) {
                result_function('error', 'El valor de ALU está vacío');
                cont++;
                return true;
            } else if (x.size === null) {
                result_function('error', 'Debes ingresar la TALLA');
                cont++;
                return true;
            }
        })

        if (fields[0]["store_asigned"] === null) {
            result_function('error', 'Debes seleccionar alguna tienda');
        } else if (fields[0]["client"] === null) {
            result_function('error', 'Debes ingresar el nombre del cliente');
        } else if (fields[0]["bill"] === null) {
            result_function('error', 'El número de la factura está vacío');
        } else if (fields[0]["address"] === null) {
            result_function('error', 'Debes ingresar la dirección destino');
        } else if (fields[0]["phone1"] === null) {
            result_function('error', 'Ingresa un número de telefono');
        } else if (fields[0]["phone2"] === null) {
            result_function('error', 'Ingresa un número de telefono');
        } else if (fields[0]["hours"] === null) {
            result_function('error', 'Debes ingresar el horario');
        } else if (fields[0]["total"] === null) {
            result_function('error', 'Ingresa el total de la venta');
        } else if (fields[0]["image"] === null) {
            result_function('error', 'Selecciona una imagen');
        } else {
            if (cont == 0) {
                storeTicketInmediates(fields)
                    .then((response) => {
                        getTicketsCreated();
                        getTicketsAssigned();
                        result_function('success', response.data.message);
                    }).catch(err => {
                        result_function('error', 'Error al crear el ticket');
                    })
            }
        }
    }

    function completeTicket(id) {
        completeTicketInmediates(id)
            .then(response => {
                getTicketsCreated();
                getTicketsAssigned();
                result_function('success', response.data.message);
            })
            .catch(error => {
                result_function('error', 'No se pudo completar el ticket');
            })
    }

    function removeTicket(id) {
        inactivateTicketInmediates(id)
            .then(response => {
                getTicketsCreated();
                getTicketsAssigned();
                result_function('success', response.data.message);
            })
            .catch(error => {
                result_function('error', 'No se pudo eliminar el ticket');
            })
    }

    function handleChange1(event, name) {
        const values = [...fields];
        if (name == "store_asigned") {
            values[0][name] = event.value;
        } else if (name == "image") {
            values[0][name] = event.target.files[0];
        } else {
            values[0][name] = event.target.value;
        }
        setFields(values);
    }

    const selectFile = (event) => {
        setFileInfos(event.target.files);
      };

    function handleChange2(i, event, name) {
        const values = [...fields];
        if (event.target.value == "") {
            values[i][name] = null;
        } else {
            values[i][name] = event.target.value;
        }
        setFields(values);
    }

    /* Crea los nuevs inputs */
    function handleAdd(e) {
        e.preventDefault();
        const values = [...fields];
        if (fields.length <= 10) {
            values.push({ upc: null, alu: null, size: null });
            setFields(values);
        } else {
            result_function('warning', 'Alcanzaste el número maximo de alementos')
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

    const handleChange3 = (event, newValue) => {
        setValue(newValue);
    };

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
                            <MDBInput label='Cliente' type='text' validate onChange={e => handleChange1(e, "client")} />
                        </MDBCol>
                        <MDBCol md='3'>
                            <MDBInput label='Factura' type='text' validate onChange={e => handleChange1(e, "bill")} />
                        </MDBCol>
                        <MDBCol md='3'>
                            <MDBInput label='Direccion' type='text' validate onChange={e => handleChange1(e, "address")} />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='2'>
                            <MDBInput label='Calular 1' type="text" validate onChange={e => handleChange1(e, "phone1")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Calular 2' type="text" validate onChange={e => handleChange1(e, "phone2")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Horario' type="text" validate onChange={e => handleChange1(e, "hours")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Total a Pagar' type="text" validate onChange={e => handleChange1(e, "total")} />
                        </MDBCol>
                        <MDBCol md='4'>
                            <MDBInput type="file" accept="image/png, image/jpeg" validate onChange={e => handleChange1(e, "image")} />
                        </MDBCol>
                    </MDBRow>
                    {fields.map((field, idx) => {
                        return (
                            <MDBRow className="center-element" key={`${field}-${idx}`}>
                                <MDBCol md='3'>
                                    <MDBInput label='UPC' type="text" validate onChange={e => handleChange2(idx, e, "upc")} />
                                </MDBCol>
                                <MDBCol md='3'>
                                    <MDBInput label='ALU' type="text" validate onChange={e => handleChange2(idx, e, "alu")} />
                                </MDBCol>
                                <MDBCol md='3'>
                                    <MDBInput label='TALLA' type="text" validate onChange={e => handleChange2(idx, e, "size")} />
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
            <br></br>
            <MDBContainer>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange3}
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
                            dataTicketsImmediatesCreated.length > 0 ? (
                                dataTicketsImmediatesCreated.map((data) => {
                                    if (data.store_created == my_store) {
                                        let orden = 0;
                                        return (
                                            <MDBCol md="6" style={{ marginBottom: "15px" }}>
                                                <MDBCard>
                                                    <MDBCardBody style={{ Height: "300px" }}>
                                                        <MDBCardTitle> <span><FaStoreAlt /> {data.store_asigned}</span>
                                                            <MDBBtn className="float-right" size="sm" color='danger' onClick={() => removeTicket(data._id)}><FaTimes style={{ fontSize: '15px' }} /></MDBBtn>
                                                        </MDBCardTitle>
                                                        <MDBCardText>
                                                            <MDBTypography>
                                                                <b>Información Destino:</b> {data.desc}
                                                            </MDBTypography>
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
                                                                    {
                                                                        data.product.length > 0 && (
                                                                            data.product.map((prod) => {
                                                                                orden++;
                                                                                return (
                                                                                    <tr>
                                                                                        <td>{orden}</td>
                                                                                        <td>{prod.upc}</td>
                                                                                        <td>{prod.alu}</td>
                                                                                        <td>{prod.siz || prod.size}</td>
                                                                                        <td>{data.fact}</td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        )
                                                                    }
                                                                </MDBTableBody>
                                                            </MDBTable>
                                                        </MDBCardText>
                                                        <span><FaRegCalendar />  <Moment format="DD/MM/YYYY">{data.timestamp}</Moment></span>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        )
                                    }
                                })
                            )
                                :
                                <MDBCol md='12'>
                                    <MDBCard color='grey' text='white' className='text-center'>
                                        <MDBCardBody>
                                            NO HAY DATOS
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                        }

                    </MDBRow>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MDBRow>
                        {
                            dataTicketsImmediatesAssigned.length > 0 ? (
                                dataTicketsImmediatesAssigned.map((data) => {
                                    if (data.store_asigned == my_store) {
                                        let orden = 0;
                                        return (
                                            <MDBCol md="6" style={{ marginBottom: "15px" }}>
                                                <MDBCard>
                                                    <MDBCardBody>
                                                        <MDBCardTitle><span><FaStoreAlt /> {data.store_created}</span>
                                                            <MDBBtn className="float-right" size="sm" color='dark-green' onClick={() => completeTicket(data._id)}><FaCheck style={{ fontSize: '15px' }} /></MDBBtn>
                                                        </MDBCardTitle>
                                                        <MDBCardText>
                                                            <MDBTypography>
                                                                <b>Información Destino:</b> {data.desc}
                                                            </MDBTypography>
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
                                                                {
                                                                    data.product.map((prod) => {
                                                                        orden++;
                                                                        return (
                                                                            <MDBTableBody>
                                                                                <tr>
                                                                                    <td>{orden}</td>
                                                                                    <td>{prod.upc}</td>
                                                                                    <td>{prod.alu}</td>
                                                                                    <td>{prod.siz || prod.size}</td>
                                                                                    <td>{data.fact}</td>
                                                                                </tr>
                                                                            </MDBTableBody>
                                                                        )
                                                                    })
                                                                }
                                                            </MDBTable>
                                                        </MDBCardText>
                                                        <span><FaRegCalendar />  <Moment format="DD/MM/YYYY">{data.timestamp}</Moment></span>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        )
                                    }
                                })
                            )
                                :
                                <MDBCol md='12'>
                                    <MDBCard color='grey' text='white' className='text-center'>
                                        <MDBCardBody>
                                            NO HAY DATOS
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                        }
                    </MDBRow>
                </TabPanel>
            </MDBContainer>
        </Layaout>
    )
}

export default ImmediateDelivery;