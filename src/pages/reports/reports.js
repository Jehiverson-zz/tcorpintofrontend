import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    MDBRow,
    MDBCol,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
    MDBTypography,
} from 'mdbreact';
import { SiMicrosoftexcel } from "react-icons/si";
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import dateFormat from 'dateformat'
import ReactExport from "react-export-excel";
import { getDamagedMerchandiseReport } from "../../functions/damagedFunction"
import { getDataReportSales, getDataReportDailies } from "../../functions/salesFunctions"
import { getStoreActives, getDataReportTickets } from "../../functions/ticketFunction";
import { getDataReportCertificates } from "../../functions/certificateFunction";
import Layaout from '../parcials/Layaout';
import CardHeader from '../../components/CardHeader'
import Loading from './img/loading.gif'
import modules from './modules'

const Reports = () => {
    const my_store = localStorage.getItem("store");
    const my_role = localStorage.getItem("type");
    const my_email = localStorage.getItem("email");
    const my_subs = localStorage.getItem("subsidiaria");
    const history = useHistory();
    const date = new Date();
    const date_init = date.toLocaleDateString().replace("/","-").replace("/","-");
    const [dataStores, setDataStores] = useState([]);
    const [dataBinacleEjection, setDataBinacleEjection] = useState([]);
    const [dataBinacleSales, setDataBinacleSales] = useState([]);
    const [dataTickets, setDataTickets] = useState([]);
    const [dataDamagedMerchandise, setDataDamagedMerchandise] = useState([]);
    const [dataCertificates, setDataCertificates] = useState([]);
    const [data, setData] = useState([]);
    const [dateStart, setDateStart] = useState(date_init);
    const [dateEnd, setDateEnd] = useState(date_init);
    const [dataStore, setDataStore] = useState(my_store);
    const [dataTicket, setDataTicket] = useState('Todos');
    const [loading, setLoading] = useState(true);
    const [showModal, setshowModal] = useState(false);
    const [model, setModel] = useState('');
    const [defaultStore, setDefaultStore] = useState({value: my_store, label: my_store});
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const today = `${date.getDate()}_${(date.getMonth() +1)}_${date.getFullYear()}`;
    const style = {
        'fontSize': '0.875rem',
        'minWidth': '64px',
        'boxSizing': 'border-box',
        'transition': 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
        'fontWeight': '500',
        'lineHeight': '1.75',
        'borderRadius': '4px',
        'letterSpacing': '0.02857em',
        'textTransform': 'uppercase',
        'padding': '6px 8px 6px 8px'
    }
    let tickets = [
        {label: "Todos", value: "Todos"},
        {label: "Traslado Sistema", value: "traslado_sistema"},
        {label: "Entregas Inmediatas", value: "entregas_inmediatas"},
        {label: "Retiros Externo", value: "retiros_externos"},
        {label: "Tickets Fotografía", value: "tickets_fotografia"},
    ]
    let stores = [];

    useEffect(() => {
        uploadData();
    }, [])

    const uploadData = () => {
        getStoreActives().then(res => {
            setDataStores(res);
        });
        getDamagedMerchandiseReport(dateStart, dateEnd, my_store).then((res) => {
            setDataDamagedMerchandise(res.data.data);
        })
        getDataReportDailies(dateStart, dateEnd, my_store).then((res) => {
            setDataBinacleEjection(res.data.data);
        })
        getDataReportSales(dateStart, dateEnd, my_store).then((res) => {
            setDataTickets(res.data.data);
        })
        getDataReportTickets(dateStart, dateEnd, dataTicket, dataStore).then((res) => {
            setDataTickets(res.data.data);
        })
        getDataReportCertificates(dateStart, dateEnd).then((res) => {
            setDataCertificates(res.data.data);
        })
        setLoading(false);
    }

    const toggle = (id=0) => {
        let mostrar = !showModal;
        setshowModal(mostrar);
    }

    if(dataStores){
        if(my_role == "admin"){
            stores.push({ value: 'Todas', label: 'Todas' })
            dataStores.map(x => {
                stores.push({ value: x.name, label: x.name })
            })
        }else{
            stores.push({ value: my_store, label: my_store })
        }
    }

    const show_modal = (model) =>{
        setModel(model);
        setshowModal(!showModal);
    }

    const limpiar = () =>{
        setModel('');
        setDateStart(date_init);
        setDateEnd(date_init);
        setDataTickets()
    }

    const reload_data = (model) => {
        switch (model) {
            case 'bitacora':
                getDataReportDailies(dateStart, dateEnd, dataStore).then((res) => {
                    setDataBinacleEjection(res.data.data);
                    setData(res.data.data);
                })
                break;
            case 'venta_diaria':
                getDataReportSales(dateStart, dateEnd, dataStore).then((res) => {
                    setDataBinacleSales(res.data.data);
                    setData(res.data.data);
                })
                break;
            case 'tickets':
                getDataReportTickets(dateStart, dateEnd, dataTicket, dataStore).then((res) => {
                    setDataTickets(res.data.data);
                    setData(res.data.data);
                })
                break;
            case 'mercaderia':
                getDamagedMerchandiseReport(dateStart, dateEnd, dataStore).then((res) => {
                    setDataDamagedMerchandise(res.data.data);
                    setData(res.data.data);
                })
                break;
            case 'certificados':
                getDataReportCertificates(dateStart, dateEnd).then((res) => {
                    setDataCertificates(res.data.data);
                    setData(res.data.data);
                })
                break;
            default:
                break;
        }
    }
    console.log(dataCertificates)
    
    return (
        <Layaout>
            { loading ?
                (<center> <img
                    alt='Preload'
                    className='img-fluid'
                    src={Loading}
                /></center>)
                :
                <React.Fragment>
                &nbsp;&nbsp;
                    <MDBRow>
                        <MDBCol md='8' className='mt-3 mx-auto'>
                            <CardHeader title="Reportería" icon="ticket-alt">
                                <MDBTable id="TableReportes">
                                    <MDBTableHead className="center-element">
                                        <tr>
                                            <th style={{width: "10%"}}>ID</th>
                                            <th style={{width: "60%"}}>Módulos</th>
                                            <th style={{width: "30%"}}>Exportar a Excel</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                    {
                                        modules.modules.map(x => {
                                            return(
                                                <tr key={x._id}>
                                                    <td>{x._id}</td>
                                                    <td>{x.name}</td>
                                                    <td className="center-element">
                                                        <Button
                                                         className="btn text-white green"
                                                         onClick={() => show_modal(x.surname)}
                                                        ><SiMicrosoftexcel /></Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </MDBTableBody>
                                </MDBTable>
                            </CardHeader>
                        </MDBCol>
                    </MDBRow>
                </React.Fragment>
            }
            <MDBModal isOpen={showModal} toggle={toggle}>
                <MDBModalHeader toggle={toggle}>Exportar a Excel</MDBModalHeader>
                <MDBModalBody>
                    <MDBRow>
                        <MDBCol md='6'>
                            <MDBInput
                                onChange={(e) => { setDateStart(e.target.value.replace("/","-").replace("/","-")) }}
                                label='Fecha Inicial'
                                type='date'
                                validate
                            />
                        </MDBCol>
                        <MDBCol md='6'>
                            <MDBInput
                                onChange={(e) => { setDateEnd(e.target.value.replace("/","-").replace("/","-")) }}
                                label='Fecha Final'
                                type='date'
                                validate
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        {
                            model == 'tickets'?(
                                <MDBCol md='6'>
                                    <MDBTypography>Ticket</MDBTypography>
                                    <Select
                                        onChange={e => setDataTicket(e.value)}
                                        defaultValue={tickets[0]}
                                        options={tickets}
                                    />
                                </MDBCol>
                            ):( '' )
                        }
                        {
                            model !== 'certificados'?(
                            <MDBCol md={model=='tickets'?'6':'10'} className={model=='tickets'?'offset-0':'offset-1'}>
                            <MDBTypography>Tienda</MDBTypography>
                                <Select
                                    onChange={e => setDataStore(e.value == 'Todas'?null:e.value)}
                                    defaultValue={defaultStore}
                                    options={stores}
                                />
                            </MDBCol>):null
                        }
                    </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                    <Button className="text-white red" onClick={() => toggle()}><span> Cancelar</span></Button>
                    {
                        data.length < 1?(
                            <Button className="btn text-white green" style={{marginLeft: "10px"}} onClick={() => reload_data(model) }>Obtener Data</Button>
                        ):(
                            model == 'mercaderia'?(
                                <ExcelFile element={<Button className="btn text-white green" onClick={()=>setData([])}>Exportar a Excel</Button>} filename={`Mercadería_Dañada_${today}`}>
                                    <ExcelSheet data={dataDamagedMerchandise} name={`Mercadería_Dañada_${today}`}>
                                        <ExcelColumn label="Daño" value="damage"/>
                                        <ExcelColumn label="UPC" value="upc"/>
                                        <ExcelColumn label="ALU" value="alu"/>
                                        <ExcelColumn label="TALLA" value="siz"/>
                                        <ExcelColumn label="Precio" value="price"/>
                                        <ExcelColumn label="Tienda" value="store_created"/>
                                        <ExcelColumn label="Fecha Creación" value="timestamp"/>
                                    </ExcelSheet>
                                </ExcelFile>
                            ): model == 'bitacora'?(
                                <ExcelFile element={<Button className="btn text-white green" onClick={()=>setData([])}>Exportar a Excel</Button>} filename={`Bitacora_Ejecución_${today}`}>
                                    <ExcelSheet data={dataBinacleEjection} name={`Bitacora_Ejecución_${today}`}>
                                        <ExcelColumn label="Meta" value="daily_goal"/>
                                        <ExcelColumn label="Año Anterior" value="year_before_sale"/>
                                        <ExcelColumn label="Vendedores" value="vendor_number"/>
                                        <ExcelColumn label="Fecha Creación" value="date_created"/>
                                    </ExcelSheet>
                                </ExcelFile>
                            ): model == 'venta_diaria'?(
                                <ExcelFile element={<Button className="btn text-white green" onClick={()=>setData([])}>Exportar a Excel</Button>} filename={`Venta_Diaria_${today}`}>
                                    <ExcelSheet data={dataBinacleSales} name={`Venta_Diaria_${today}`}>
                                        <ExcelColumn label="Venta" value="ventas"/>
                                        <ExcelColumn label="Meta" value="metas"/>
                                        <ExcelColumn label="Encargado" value="manager"/>
                                        <ExcelColumn label="Tienda" value="tienda"/>
                                        <ExcelColumn label="Fecha Creación" value="fechaCreacion"/>
                                    </ExcelSheet>
                                </ExcelFile>
                            ): model == 'tickets'?(
                                dataTickets.type !== 'Todos'?(
                                    dataTickets.traslado_sistema !== null ?(
                                    <ExcelFile element={<Button className="btn text-white green" onClick={()=>setData([])}>Exportar a Excel</Button>} filename={`Traslado_Sistema_${today}`}>
                                        <ExcelSheet data={dataTickets.traslado_sistema} name={`Traslado_Sistema_${today}`}>
                                            <ExcelColumn label="No. FACTURA" value="fact"/>
                                            <ExcelColumn label="PRODUCTO" value={row => `${row.product.map(x =>  `UPC:${x.upc} ALU:${x.alu} TALLA:${x.siz}`)}` }/>
                                            <ExcelColumn label="RETAILN" value="retailn"/>
                                            <ExcelColumn label="ESTADO" value="status"/>
                                            <ExcelColumn label="TIENDA CREADORA" value="store_created"/>
                                            <ExcelColumn label="TIENDA RESEPTORA" value="store_asigned"/>
                                            <ExcelColumn label="FECHA CREACIÓN" value="timestamp"/>
                                        </ExcelSheet>
                                    </ExcelFile>
                                    ):dataTickets.entrega_inmediata !== null ?(
                                    <ExcelFile element={<Button className="btn text-white green" onClick={()=>setData([])}>Exportar a Excel</Button>} filename={`Entregas_Inmediatas_${today}`}>
                                        <ExcelSheet data={dataTickets.entrega_inmediata} name={`Entregas_Inmediatas_${today}`}>
                                            <ExcelColumn label="No. FACTURA" value="fact"/>
                                            <ExcelColumn label="DESCRIPCION" value="desc"/>
                                            <ExcelColumn label="PRODUCTO" value={row => `${row.product.map(x =>  `UPC:${x.upc} ALU:${x.alu} TALLA:${x.siz}`)}` }/>
                                            <ExcelColumn label="ESTADO" value="status"/>
                                            <ExcelColumn label="TIENDA CREADORA" value="store_created"/>
                                            <ExcelColumn label="TIENDA RESEPTORA" value="store_asigned"/>
                                            <ExcelColumn label="FECHA CREACIÓN" value="timestamp"/>
                                        </ExcelSheet>
                                    </ExcelFile>
                                    ):dataTickets.retiro_externo !== null ?(
                                    <ExcelFile element={<Button className="btn text-white green" onClick={()=>setData([])}>Exportar a Excel</Button>} filename={`Reritos_Externos_${today}`}>
                                        <ExcelSheet data={dataTickets.retiro_externo} name={`Reritos_Externos_${today}`}>
                                            <ExcelColumn label="No. FACTURA" value="inv_val"/>
                                            <ExcelColumn label="PERSONA QUE RETRIA" value="person_retreats"/>
                                            <ExcelColumn label="PERSONA QUE AUTORIZA" value="person_authorizing"/>
                                            <ExcelColumn label="PRODUCTO" value={row => `${row.product.map(x =>  `UPC:${x.upc} ALU:${x.alu} TALLA:${x.siz}`)}` }/>
                                            <ExcelColumn label="ESTADO" value="status"/>
                                            <ExcelColumn label="FECHA CREACIÓN" value="timestamp"/>
                                        </ExcelSheet>
                                    </ExcelFile>
                                    ):dataTickets.tickets_fotografia !== null ?(
                                    <ExcelFile element={<Button className="btn text-white green" onClick={()=>setData([])}>Exportar a Excel</Button>} filename={`Tickets_Fotogrfía_${today}`}>
                                        <ExcelSheet data={dataTickets.tickets_fotografia} name={`Tickets_Fotogrfía_${today}`}>
                                            <ExcelColumn label="PERSONA QUE RETRIA" value="caurier"/>
                                            <ExcelColumn label="TIENDA CREADORA" value="store_created"/>
                                            <ExcelColumn label="PRODUCTO" value={row => `${row.product.map(x =>  `UPC:${x.upc} ALU:${x.alu} TALLA:${x.siz}`)}` }/>
                                            <ExcelColumn label="ESTADO" value="status"/>
                                            <ExcelColumn label="FECHA CREACIÓN" value="timestamp"/>
                                        </ExcelSheet>
                                    </ExcelFile>
                                    ):null
                                ):(
                                    <ExcelFile element={<Button className="btn text-white green" onClick={()=>setData([])}>Exportar a Excel</Button>} filename={`Tickets_${today}`}>
                                        <ExcelSheet data={dataTickets.traslado_sistema!= null?dataTickets.traslado_sistema:[]} name={`Traslado_Sistema_${today}`}>
                                            <ExcelColumn label="No. FACTURA" value="fact"/>
                                            <ExcelColumn label="PRODUCTO" value={row => `${row.product.map(x =>  `UPC:${x.upc} ALU:${x.alu} TALLA:${x.siz}`)}` }/>
                                            <ExcelColumn label="RETAILN" value="retailn"/>
                                            <ExcelColumn label="ESTADO" value="status"/>
                                            <ExcelColumn label="TIENDA CREADORA" value="store_created"/>
                                            <ExcelColumn label="TIENDA RESEPTORA" value="store_asigned"/>
                                            <ExcelColumn label="FECHA CREACIÓN" value="timestamp"/>
                                        </ExcelSheet>
                                        <ExcelSheet data={dataTickets.entrega_inmediata!= null?dataTickets.entrega_inmediata:[]} name={`Entregas_Inmediatas_${today}`}>
                                            <ExcelColumn label="No. FACTURA" value="fact"/>
                                            <ExcelColumn label="DESCRIPCION" value="desc"/>
                                            <ExcelColumn label="PRODUCTO" value={row => `${row.product.map(x =>  `UPC:${x.upc} ALU:${x.alu} TALLA:${x.siz}`)}` }/>
                                            <ExcelColumn label="ESTADO" value="status"/>
                                            <ExcelColumn label="TIENDA CREADORA" value="store_created"/>
                                            <ExcelColumn label="TIENDA RESEPTORA" value="store_asigned"/>
                                            <ExcelColumn label="FECHA CREACIÓN" value="timestamp"/>
                                        </ExcelSheet>
                                        <ExcelSheet data={dataTickets.retiro_externo!=null?dataTickets.retiro_externo:[]} name={`Reritos_Externos_${today}`}>
                                            <ExcelColumn label="No. FACTURA" value="inv_val"/>
                                            <ExcelColumn label="PERSONA QUE RETRIA" value="person_retreats"/>
                                            <ExcelColumn label="PERSONA QUE AUTORIZA" value="person_authorizing"/>
                                            <ExcelColumn label="PRODUCTO" value={row => `${row.product.map(x =>  `UPC:${x.upc} ALU:${x.alu} TALLA:${x.siz}`)}` }/>
                                            <ExcelColumn label="ESTADO" value="status"/>
                                            <ExcelColumn label="FECHA CREACIÓN" value="timestamp"/>
                                        </ExcelSheet>
                                        <ExcelSheet data={dataTickets.tickets_fotografia!=null?dataTickets.tickets_fotografia:[]} name={`Tickets_Fotogrfía_${today}`}>
                                            <ExcelColumn label="PERSONA QUE RETRIA" value="caurier"/>
                                            <ExcelColumn label="TIENDA CREADORA" value="store_created"/>
                                            <ExcelColumn label="PRODUCTO" value={row => `${row.product.map(x =>  `UPC:${x.upc} ALU:${x.alu} TALLA:${x.siz}`)}` }/>
                                            <ExcelColumn label="ESTADO" value="status"/>
                                            <ExcelColumn label="FECHA CREACIÓN" value="timestamp"/>
                                        </ExcelSheet>
                                    </ExcelFile>
                                )
                            ): model == 'certificados'?(
                                <ExcelFile element={<Button className="btn text-white green" onClick={()=>setData([])}>Exportar a Excel</Button>} filename={`Certificados_${today}`}>
                                    <ExcelSheet data={dataCertificates} name={`Certificados_${today}`}>
                                        <ExcelColumn label="No. CERTIFICADO" value="no_cer"/>
                                        <ExcelColumn label="NOMBRE" value="name_cer"/>
                                        <ExcelColumn label="VALOR" value="val_cer"/>
                                        <ExcelColumn label="FECHA EMISIÓN" value={row => dateFormat(row.date_start_cer, 'dd/mm/yyyy')}/>
                                        <ExcelColumn label="FECHA VENCIMIENTO" value={row => dateFormat(row.date_end_cer, 'dd/mm/yyyy')}/>
                                        <ExcelColumn label="OBSERVACIONES" value="obs_cer"/>
                                        <ExcelColumn label="MEATPACK" value="meatpack"/>
                                        <ExcelColumn label="SPERRY" value="sperry"/>
                                        <ExcelColumn label="QUIKSILVER" value="quiksilver"/>
                                        <ExcelColumn label="GUESS" value="guess"/>
                                        <ExcelColumn label="COLE HAAN" value="colehaan"/>
                                        <ExcelColumn label="DIESEL" value="diesel"/>
                                        <ExcelColumn label="FECHA CRACIÓN" value="date_created"/>
                                    </ExcelSheet>
                                </ExcelFile>
                            ):null
                        )
                    }
                </MDBModalFooter>
            </MDBModal>
        </Layaout>
    )

}
export default Reports;