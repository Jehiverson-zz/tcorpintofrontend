import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader'
import { retreatShowListHistory } from '../../../functions/retreatsFunction'
import Loading from './img/loading.gif'
import ReactExport from "react-export-excel";
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';
import Tablebinnacle from './listDebt';

import Pagination from '../../../components/pagination';

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

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

const DatosdeVenta = () => {
    const history = useHistory();
    const [dataRetreatsAccepted, setdataRetreatsAccepted] = useState([]);
    const [dataRetreatsCancel, setdataRetreatsCancel] = useState([]);
    const [dataRetreatsDeneged, setdataRetreatsDeneged] = useState([]);
    const [currentPageAccepted, setCurrentPageAccepted] = useState(1);
    const [postsPerPageAccepted] = useState(80);
    const [currentPageCancel, setCurrentPageCancel] = useState(1);
    const [postsPerPageCancel] = useState(80);
    const [currentPageDeneged, setCurrentPageDeneged] = useState(1);
    const [postsPerPageDeneged] = useState(80);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(0);
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const date = new Date();
    const today = `${date.getDate()}_${(date.getMonth() +1)}_${date.getFullYear()}`;
    const filename_aceptados = `Retiros_Aceptados_${today}`;
    const filename_denegados = `Retiros_Denegados_${today}`;
    const filename_cancel = `Retiros_Cancelados_${today}`;
    const handleChangeSteps = (event, newValue) => {
        setStep(newValue);
    };
 
    useEffect(() => {
        retreatShowListHistory(localStorage.getItem("store"),localStorage.getItem('type'))
            .then((res) =>{
            dataAsigned(res)
            setLoading(false)
            })
            .catch(err =>
                setLoading(true)
            )
    }, [])

    const dataAsigned = (data) => {
         setdataRetreatsAccepted(data.acepted)
         setdataRetreatsCancel(data.cancel)
         setdataRetreatsDeneged(data.deneged)
        
    };

    // Get current posts
    const indexOfLastPostAccepted = currentPageAccepted * postsPerPageAccepted;
    const indexOfFirstPostAccepted = indexOfLastPostAccepted - postsPerPageAccepted;
    const currentPostsAccepted = dataRetreatsAccepted.slice(indexOfFirstPostAccepted, indexOfLastPostAccepted);
    const paginateAccepted = pageNumberAccepted => setCurrentPageAccepted(pageNumberAccepted);

    // Get current posts
    const indexOfLastPostCancel = currentPageCancel * postsPerPageCancel;
    const indexOfFirstPostCancel = indexOfLastPostCancel - postsPerPageCancel;
    const currentPostsCancel = dataRetreatsCancel.slice(indexOfFirstPostCancel, indexOfLastPostCancel);
    const paginateCancel = pageNumber => setCurrentPageCancel(pageNumber);

    // Get current posts
    const indexOfLastPostDeneged = currentPageDeneged * postsPerPageDeneged;
    const indexOfFirstPostDeneged = indexOfLastPostDeneged - postsPerPageDeneged;
    const currentPostsDeneged = dataRetreatsDeneged.slice(indexOfFirstPostDeneged, indexOfLastPostDeneged);
    const paginateDeneged = pageNumber => setCurrentPageDeneged(pageNumber);
    if (localStorage.getItem('session') !== "true") {
        history.push(`/`);
    }

    return (
        <Layaout>
            { loading ?
                (<center> <img
                    alt='Preload'
                    className='img-fluid'
                    src={Loading}
                /></center>)
                : 
                <>
                <br></br>

                <AppBar position="static" color="default">
                    <Tabs
                        value={step}
                        onChange={handleChangeSteps}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Retiros Aceptados" {...a11yProps(0)} />
                        <Tab label="Retiros Denegados" {...a11yProps(1)} />
                        <Tab label="Retiros Cancelados" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>

                <TabPanel value={step} index={0}>
                    <CardHeader title="Historial Aceptados" icon="ticket-alt">
                        {
                            currentPostsAccepted.length > 0 && (
                                <div align="right">
                                    <ExcelFile element={<Button className="btn btn-success text-white">Exportar a Excel</Button>} filename={filename_aceptados}>
                                        <ExcelSheet data={currentPostsAccepted} name={filename_aceptados}>
                                            <ExcelColumn label="Nombre" value="name"/>
                                            <ExcelColumn label="Precio" value="price"/>
                                            <ExcelColumn label="Descuento" value="total_debt"/>
                                            <ExcelColumn label="Precio Final" value="price_f"/>
                                            <ExcelColumn label="Fecha Creación" value="date_created"/>
                                            <ExcelColumn label="Fecha Actualización" value="update_created"/>
                                        </ExcelSheet>
                                    </ExcelFile>
                                </div>
                            )
                        }
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Descuento</th>
                                    <th>Prefio final</th>
                                    <th>Fecha de Creación</th>
                                    <th>Fecha de Actualización</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <Tablebinnacle posts={currentPostsAccepted} loading={loading} />
                            </MDBTableBody>
                            {dataRetreatsAccepted.length < 1 ? (<tr><td colSpan="4"><center>No existen datos de venta</center></td></tr>):""}
                            <Pagination
                                postsPerPage={currentPostsAccepted}
                                totalPosts={dataRetreatsAccepted.length}
                                paginate={paginateAccepted}
                                currentPage={currentPageAccepted}
                            />
                        </MDBTable>
                    </CardHeader>
                </TabPanel>
                <TabPanel value={step} index={1}>
                    <CardHeader title="Historial Denegados" icon="ticket-alt">
                    {
                        currentPostsDeneged.length > 0 && (
                            <div align="right">
                                <ExcelFile element={<Button className="btn btn-success text-white">Exportar a Excel</Button>} filename={filename_denegados}>
                                    <ExcelSheet data={currentPostsDeneged} name={filename_denegados}>
                                        <ExcelColumn label="Nombre" value="name"/>
                                        <ExcelColumn label="Precio" value="price"/>
                                        <ExcelColumn label="Descuento" value="total_debt"/>
                                        <ExcelColumn label="Precio Final" value="price_f"/>
                                        <ExcelColumn label="Fecha Creación" value="date_created"/>
                                        <ExcelColumn label="Fecha Actualización" value="update_created"/>
                                    </ExcelSheet>
                                </ExcelFile>
                            </div>
                        )
                    }
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Descuento</th>
                                    <th>Prefio final</th>
                                    <th>Fecha de Creación</th>
                                    <th>Fecha de Actualización</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <Tablebinnacle posts={currentPostsDeneged} loading={loading} />
                            </MDBTableBody>
                            {dataRetreatsDeneged.length < 1 ? (<tr><td colSpan="4"><center>No existen datos de venta</center></td></tr>):""}
                            <Pagination
                                postsPerPage={postsPerPageDeneged}
                                totalPosts={dataRetreatsDeneged.length}
                                paginate={paginateDeneged}
                                currentPage={currentPageDeneged}
                            />
                        </MDBTable>
                    </CardHeader>
                </TabPanel>
                <TabPanel value={step} index={2}>
                    <CardHeader title="Historial Cancelados" icon="ticket-alt">
                    {
                        currentPostsCancel.length > 0 && (
                            <div align="right">
                                <ExcelFile element={<Button className="btn btn-success text-white">Exportar a Excel</Button>} filename={filename_cancel}>
                                    <ExcelSheet data={currentPostsCancel} name={filename_cancel}>
                                        <ExcelColumn label="Nombre" value="name"/>
                                        <ExcelColumn label="Precio" value="price"/>
                                        <ExcelColumn label="Descuento" value="total_debt"/>
                                        <ExcelColumn label="Precio Final" value="price_f"/>
                                        <ExcelColumn label="Fecha Creación" value="date_created"/>
                                        <ExcelColumn label="Fecha Actualización" value="update_created"/>
                                    </ExcelSheet>
                                </ExcelFile>
                            </div>
                        )
                    }
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Descuento</th>
                                    <th>Precio final</th>
                                    <th>Fecha de Creación</th>
                                    <th>Fecha de Actualización</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <Tablebinnacle posts={currentPostsCancel} loading={loading} />
                            </MDBTableBody>
                            {dataRetreatsCancel.length < 1 ? (<tr><td colSpan="4"><center>No existen datos de venta</center></td></tr>):""}
                            <Pagination
                                postsPerPage={postsPerPageCancel}
                                totalPosts={dataRetreatsCancel.length}
                                paginate={paginateCancel}
                                currentPage={currentPageCancel}
                            />
                        </MDBTable>
                    </CardHeader>
                </TabPanel>
                </>}
        </Layaout>
    )

}
export default DatosdeVenta;