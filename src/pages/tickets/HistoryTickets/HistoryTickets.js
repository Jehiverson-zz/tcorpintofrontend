import React, { useState, useEffect } from 'react';
import Layaout from '../../parcials/Layaout';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {
    getAllTicketsSystemTransfer,
    getAllTicketsImmediatesDeliveries,
    getAllPhotoRetreats,
    getAllExternalRetreats
} from '../../../functions/ticketFunction';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBContainer,
    MDBTypography,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';
import Moment from 'react-moment';
import { FaTimes, FaCheckDouble, FaPersonBooth, FaStoreAlt, FaCheck, FaRegCalendar } from 'react-icons/fa';
import Select from 'react-select';
import Loading from '../../bitacoras/ventadiaria/img/loading.gif'

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
const HistoryTickets = () => {
    const my_store = localStorage.getItem("store")
    const [value, setValue] = useState(0);
    const [dataTickets, setdataTickets] = useState([]);
    const [dataTicketsImmeditaes, setdataTicketsImmeditaes] = useState([]);
    const [photoRetreats, setphotoRetreats] = useState([]);
    const [externalRetreats, setExternalRetreats] = useState([]);
    const [status, setStatus] = useState({ status: 'Pendiente' });
    const [loading, setLoading] = useState(true);
    const filter_values = [
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Completado', label: 'Completado' },
        { value: 'Cancelado', label: 'Cancelado' },
    ];
    const default_store = { value: 'Pendiente', label: 'Pendiente' };
    const handleChange2 = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeFilter = (event, type) => {
        setStatus({ status: event.value });
        setLoading(true);
        if (type == 'Traslado') {
            getTicketsTransfer(event.value);
        } else if (type == 'Inmediates') {
            getTicketsInemdiates(event.value);
        } else if (type == 'Externos') {
            getTicketsExternalRetreats(event.value);
        } else if (type == 'Fotografias') {
            getTicketsPhotoRetreats(event.value);
        }
    };

    useEffect(() => {
        getTicketsTransfer(status.status)
        getTicketsInemdiates(status.status)
        getTicketsExternalRetreats(status.status)
        getTicketsPhotoRetreats(status.status)
    }, [])

    function getTicketsTransfer(status) {
        getAllTicketsSystemTransfer(status).then((res) => {
            setTimeout(() => {
                setdataTickets(res);
                setLoading(false)
            }, 2000);
        }).catch((error) => {
            console.log(error)
        });
    }
    function getTicketsInemdiates(status) {
        getAllTicketsImmediatesDeliveries(status)
            .then((response) => {
                setTimeout(() => {
                    setdataTicketsImmeditaes(response);
                    setLoading(false)
                }, 2000);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    function getTicketsPhotoRetreats(status) {
        getAllPhotoRetreats(status).then((res) => {
            setTimeout(() => {
                setphotoRetreats(res);
                setLoading(false)
            }, 2000);
        }).catch((error) => {
            console.log(error)
        });
    }
    function getTicketsExternalRetreats(status) {
        getAllExternalRetreats(status).then((res) => {
            setTimeout(() => {
                setExternalRetreats(res);
                setLoading(false)
            }, 2000);
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <Layaout>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange2}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Traslado de Sistema" {...a11yProps(0)} />
                    <Tab label="Entregas Inemdiatas" {...a11yProps(1)} />
                    <Tab label="Retiros Externos" {...a11yProps(2)} />
                    <Tab label="Retiros Fotografía" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <MDBRow className="center-element">
                    <MDBCol md='3' >
                        <label>Selecciona un estado</label>
                        <Select
                            onChange={e => handleChangeFilter(e, 'Traslado')}
                            defaultValue={default_store}
                            options={filter_values}
                        />
                    </MDBCol>
                </MDBRow>
                <br></br>
                {loading ?
                    (<center> <img
                        alt='Preload'
                        className='img-fluid'
                        src={Loading}
                    /></center>)
                    : (
                        <MDBRow>
                            {
                                dataTickets.length > 0 ? (
                                    dataTickets.map((data) => {
                                        if (data.store_created == my_store) {
                                            let orden = 0;
                                            return (
                                                <MDBCol md="4" style={{ marginBottom: "15px" }}>
                                                    <MDBCard>
                                                        <MDBCardBody style={{ Height: "300px" }}>
                                                            <MDBCardTitle> <span><FaStoreAlt /> {data.store_asigned}</span>
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
                                                                                            <td>{data.fact || prod.bill}</td>
                                                                                        </tr>
                                                                                    )
                                                                                })
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
                                    <MDBCol md='12'>
                                        <MDBCard color='grey' text='white' className='text-center'>
                                            <MDBCardBody>
                                                NO HAY DATOS
                                        </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                            }
                        </MDBRow>
                    )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MDBRow className="center-element">
                    <MDBCol md='3' >
                        <label>Selecciona un estado</label>
                        <Select
                            onChange={e => handleChangeFilter(e, 'Inmediates')}
                            defaultValue={default_store}
                            options={filter_values}
                        />
                    </MDBCol>
                </MDBRow>
                <br></br>
                {
                    loading ?
                        (<center> <img
                            alt='Preload'
                            className='img-fluid'
                            src={Loading}
                        /></center>)
                        : (
                            <MDBRow>
                                {
                                    dataTicketsImmeditaes.length > 0 ? (
                                        dataTicketsImmeditaes.map((data) => {
                                            let orden = 0;
                                            return (
                                                <MDBCol md="4" style={{ marginBottom: "15px" }}>
                                                    <MDBCard>
                                                        <MDBCardBody style={{ Height: "300px" }}>
                                                            <MDBCardTitle> <span><FaStoreAlt /> {data.store_asigned}</span>
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
                                                                        }
                                                                    </MDBTableBody>
                                                                </MDBTable>
                                                            </MDBCardText>
                                                            <span><FaRegCalendar />  <Moment format="DD/MM/YYYY">{data.timestamp}</Moment></span>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </MDBCol>
                                            )
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
                        )
                }
            </TabPanel>
            <TabPanel value={value} index={2}>
                <MDBRow className="center-element">
                    <MDBCol md='3' >
                        <label>Selecciona un estado</label>
                        <Select
                            onChange={e => handleChangeFilter(e, 'Externos')}
                            defaultValue={default_store}
                            options={filter_values}
                        />
                    </MDBCol>
                </MDBRow>
                <br></br>
                {
                    loading ?
                        (<center> <img
                            alt='Preload'
                            className='img-fluid'
                            src={Loading}
                        /></center>)
                        : (
                            <MDBRow>
                                {
                                    externalRetreats.length > 0 ? (
                                        externalRetreats.map((data) => {
                                            if (data.store_created == my_store) {
                                                let orden = 0;
                                                return (
                                                    <MDBCol md="4" style={{ marginBottom: "15px" }}>
                                                        <MDBCard>
                                                            <MDBCardBody style={{ Height: "300px" }}>
                                                                <MDBCardTitle>
                                                                    <span style={{ fontSize: "18px" }}><FaPersonBooth /> {data.name}  </span>
                                                                    <span className="float-right" style={{ marginLeft: "10px", fontSize: "18px" }}><FaCheckDouble /> {data.manager}</span>
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
                                                                                            <td>{prod.siz || prod.size}</td>
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
                                        <MDBCol md='12'>
                                            <MDBCard color='grey' text='white' className='text-center'>
                                                <MDBCardBody>
                                                    NO HAY DATOS
                                        </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                }
                            </MDBRow>
                        )
                }
            </TabPanel>
            <TabPanel value={value} index={3}>
                <MDBRow className="center-element">
                    <MDBCol md='3' >
                        <label>Selecciona un estado</label>
                        <Select
                            onChange={e => handleChangeFilter(e, 'Fotografias')}
                            defaultValue={default_store}
                            options={filter_values}
                        />
                    </MDBCol>
                </MDBRow>
                <br></br>
                {
                    loading ?
                        (<center> <img
                            alt='Preload'
                            className='img-fluid'
                            src={Loading}
                        /></center>)
                        : (
                            <MDBRow>
                                {
                                    photoRetreats.length > 0 ? (
                                        photoRetreats.map((data) => {
                                            if (data.store_created == my_store) {
                                                let orden = 0;
                                                return (
                                                    <MDBCol md="4" style={{ marginBottom: "15px" }}>
                                                        <MDBCard>
                                                            <MDBCardBody style={{ Height: "300px" }}>
                                                                <MDBCardTitle><span><FaStoreAlt /> {data.store_asigned}</span></MDBCardTitle>
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
                                                                                            <td>{prod.siz || prod.size}</td>
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
                                        <MDBCol md='12'>
                                            <MDBCard color='grey' text='white' className='text-center'>
                                                <MDBCardBody>
                                                    NO HAY DATOS
                                        </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                }
                            </MDBRow>
                        )
                }
            </TabPanel>
        </Layaout>
    )
}

export default HistoryTickets;