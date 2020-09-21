import React, {useState, useEffect} from 'react';
import Layaout from '../../parcials/Layaout';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {
    getTicketsSystemTransferCreated,
    getTicketsSystemTransferAssigned,
    getPhotoRetreats,
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
import { FaTimes, FaCheckDouble, FaPersonBooth,FaStoreAlt } from 'react-icons/fa';

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
const HistoryTickets = () => {
    const my_store = localStorage.getItem("store")
    const [value, setValue] = useState(0);
    const [dataTicketsCreated, setdataTicketsCreated] = useState([]);
    const [dataTicketsAssigned, setdataTicketsAssigned] = useState([]);
    const [photoRetreats, setphotoRetreats] = useState([]);
    const [externalRetreats, setExternalRetreats] = useState([]);

    const handleChange2 = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(()=>{
        getTicketsTransferCreated()
        getTicketsTransferAsigned()
        getTicketsPhotoRetreats()
        getTicketsExternalRetreats()
    },[])

    function getTicketsTransferCreated(){
        getTicketsSystemTransferCreated().then((res) => setdataTicketsCreated(res));
    }
    function getTicketsTransferAsigned(){
        getTicketsSystemTransferAssigned().then((res) => setdataTicketsAssigned(res));
    }
    function getTicketsPhotoRetreats(){
        getPhotoRetreats().then((res) => setphotoRetreats(res));
    }
    function getTicketsExternalRetreats(){
        getExternalRetreats().then((res) => setExternalRetreats(res.result));
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
                <TabPanel value={value} index={0}>Traslados de Sistema</TabPanel>
                <TabPanel value={value} index={1}>Entregas Inmeditas</TabPanel>
                <TabPanel value={value} index={2}>
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
                <TabPanel value={value} index={3}>
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
        </Layaout>
    )
}

export default HistoryTickets;