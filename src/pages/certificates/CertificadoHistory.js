import React, { useState, useEffect } from 'react';
import TableCertificates from './TableCertificates'
import Layaout from '../parcials/Layaout';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {
    getAllCertificates,
} from '../../functions/certificateFunction';
import {
    getStore
} from '../../functions/ticketFunction';
import {
    MDBRow,
    MDBCol,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBContainer
} from 'mdbreact';
import Select from 'react-select';
import Loading from '../bitacoras/ventadiaria/img/loading.gif'
import Pagination from '../../components/pagination';
import Button from '@material-ui/core/Button';
import ReactExport from "react-export-excel";

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
const HistoryCertificate = () => {
    const my_store = localStorage.getItem("store")
    const [value, setValue] = useState(0);
    const [dataCertificatesActives, setDataCertificatesActives] = useState([]);
    const [dataCertificatesInactives, setDataCertificatesInactives] = useState([]);
    const [status, setStatus] = useState({ status: my_store });
    const [loading, setLoading] = useState(true);
    const [stores, setStores] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(51);
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const date = new Date();
    const today = `${date.getDate()}_${(date.getMonth() +1)}_${date.getFullYear()}`;
    const filename_act = `Certificados_Activos_${today}`;
    const filename_inact = `Certificados_Inactivos_${today}`;
    const default_store = { value: status.status, label: status.status };
    const handleChange2 = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeFilter = (event) => {
        setStatus({ status: event.value });
        setLoading(true);
        getAllData(event.value);
    };

    const handleClickTab = (type) => {
        getAllData(status.status);
        setLoading(true);
        setCurrentPage(1);
    };

    const getAllStore = () => {
        getStore()
            .then((response) => {
                let storeList = []
                response.map(store => {
                    return storeList.push({ value: store.name, label: store.name })
                })
                setStores(storeList);
            })
            .catch(err => console.log(err))
    }

    const getAllData = (store) => {
        getAllCertificates(store)
            .then((response) => {
                setDataCertificatesActives(response.data.activos);
                setDataCertificatesInactives(response.data.canjeados);
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllData(status.status);
        getAllStore();
    }, [])
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataCertificatesActives.slice(indexOfFirstPost, indexOfLastPost);
    const currentPosts2 = dataCertificatesInactives.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
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
                    <Tab label="Certificados Activos" {...a11yProps(0)} onClick={() => handleClickTab('Activo')} />
                    <Tab label="Certificados Inactivos" {...a11yProps(1)} onClick={() => handleClickTab('Inctivo')} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {
                    localStorage.getItem('type') == 'admin' && (
                        <MDBRow className="center-element">
                            <MDBCol md='3'>
                                <label>Selecciona una tienda</label>
                                <Select
                                    onChange={e => handleChangeFilter(e)}
                                    defaultValue={default_store}
                                    options={stores}
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                            {
                                currentPosts.length > 0 && (
                                    <div align="right" style={{marginTop: "30px"}}>
                                        <ExcelFile element={<Button className="btn btn-success text-white">Exportar a Excel</Button>} filename={filename_act}>
                                            <ExcelSheet data={currentPosts} name={filename_act}>
                                                <ExcelColumn label="No. Certificado" value="no_cer"/>
                                                <ExcelColumn label="Nombre" value="name_cer"/>
                                                <ExcelColumn label="Valor" value="val_cer"/>
                                                <ExcelColumn label="Fecha Emisión" value="date_start_cer"/>
                                                <ExcelColumn label="Fecha Vencimiento" value="date_end_cer"/>
                                                <ExcelColumn label="Observaciones" value="obs_cer"/>
                                                <ExcelColumn label="Meatpack" value="meatpack"/>
                                                <ExcelColumn label="Sperry" value="sperry"/>
                                                <ExcelColumn label="Quiksilver" value="quiksilver"/>
                                                <ExcelColumn label="Guess" value="guess"/>
                                                <ExcelColumn label="Cole Haan" value="colehaan"/>
                                                <ExcelColumn label="Diesel" value="diesel"/>
                                            </ExcelSheet>
                                        </ExcelFile>
                                    </div>
                                )
                            }
                            </MDBCol>
                        </MDBRow>
                    )
                }
                <br></br>
                {loading ?
                    (<center> <img
                        alt='Preload'
                        className='img-fluid'
                        src={Loading}
                    /></center>)
                    : (
                        <>
                            <MDBContainer>
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>No. Certificado</th>
                                            <th>Nombre</th>
                                            <th>Valor</th>
                                            <th>Fecha de Emisión</th>
                                            <th>Fecha de Vencimiento</th>
                                            <th>Observaciones</th>
                                            <th>Meatpack</th>
                                            <th>Sperry</th>
                                            <th>Quiksilver</th>
                                            <th>Guess</th>
                                            <th>Cole Haan</th>
                                            <th>Diesel</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <TableCertificates posts={currentPosts} loading={loading} />
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBContainer>
                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={dataCertificatesActives.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        </>
                    )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {
                    localStorage.getItem('type') == 'admin' && (
                        <MDBRow className="center-element">
                            <MDBCol md='3' >
                                <label>Selecciona una tienda</label>
                                <Select
                                    onChange={e => handleChangeFilter(e)}
                                    defaultValue={default_store}
                                    options={stores}
                                />
                            </MDBCol>
                            <MDBCol md='4'>
                            {
                                currentPosts2.length > 0 && (
                                    <div align="right" style={{marginTop: "30px"}}>
                                        <ExcelFile element={<Button className="btn btn-success text-white">Exportar a Excel</Button>} filename={filename_inact}>
                                            <ExcelSheet data={currentPosts} name={filename_inact}>
                                                <ExcelColumn label="No. Certificado" value="no_cer"/>
                                                <ExcelColumn label="Nombre" value="name_cer"/>
                                                <ExcelColumn label="Valor" value="val_cer"/>
                                                <ExcelColumn label="Fecha Emisión" value="date_start_cer"/>
                                                <ExcelColumn label="Fecha Vencimiento" value="date_end_cer"/>
                                                <ExcelColumn label="Observaciones" value="obs_cer"/>
                                                <ExcelColumn label="Meatpack" value="meatpack"/>
                                                <ExcelColumn label="Sperry" value="sperry"/>
                                                <ExcelColumn label="Quiksilver" value="quiksilver"/>
                                                <ExcelColumn label="Guess" value="guess"/>
                                                <ExcelColumn label="Cole Haan" value="colehaan"/>
                                                <ExcelColumn label="Diesel" value="diesel"/>
                                            </ExcelSheet>
                                        </ExcelFile>
                                    </div>
                                )
                            }
                            </MDBCol>
                        </MDBRow>
                    )
                }
                <br></br>
                {
                    loading ?
                        (<center> <img
                            alt='Preload'
                            className='img-fluid'
                            src={Loading}
                        /></center>)
                        : (
                            <>
                                <MDBContainer>
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>No. Certificado</th>
                                                <th>Nombre</th>
                                                <th>Valor</th>
                                                <th>Fecha de Emisión</th>
                                                <th>Fecha de Vencimiento</th>
                                                <th>Observaciones</th>
                                                <th>Meatpack</th>
                                                <th>Sperry</th>
                                                <th>Quiksilver</th>
                                                <th>Guess</th>
                                                <th>Cole Haan</th>
                                                <th>Diesel</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            <TableCertificates posts={currentPosts2} loading={loading} />
                                        </MDBTableBody>
                                    </MDBTable>
                                </MDBContainer>
                                <MDBRow className="center-element">
                                    <Pagination
                                        postsPerPage={postsPerPage}
                                        totalPosts={dataCertificatesInactives.length}
                                        paginate={paginate}
                                        currentPage={currentPage}
                                    />
                                </MDBRow>
                            </>
                        )
                }
            </TabPanel>
        </Layaout>
    )
}

export default HistoryCertificate;