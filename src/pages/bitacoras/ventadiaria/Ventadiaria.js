import React, { useEffect, useState } from 'react';
import Layaout from '../../parcials/Layaout';
import CardHeader from '../../../components/CardHeader'
import { getCollaboration } from '../../../functions/collaboratorFunction'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';

import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBAnimation
} from 'mdbreact';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Datos de venta', 'Datos de vendedores', 'Facturación', 'Métodos de pago', 'Observaciones'];
}

const TransferSystemPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [dataCollaboration, setdataCollaboration] = useState([]);
    const [vendor, setVendor] = useState([{ nombre: "", venta: 0 }]);
    const [dataSales, setdataSales] = useState([{
        venta_diaria: 0,
        no_personas: 0,
        no_ventas: 0,
        meta: 0,
        venta_anterior: 0,
        encargado: 0,
        factoresDeVenta:"",
        facturas_sis_desde: "-",
        facturas_sis_hasta: "-",
        facturas_sis_total: 0,
        facturas_man_desde: "-",
        facturas_man_hasta: "-",
        facturas_man_total: 0,
        facturas_cod_desde: "-",
        facturas_cod_hasta: "-",
        facturas_cod_total: 0,
        facturas_nota_desde: "-",
        facturas_nota_hasta: "-",
        facturas_nota_total: 0,
        efectivoQuetzales: 0,
        efectivoQuetzalesDolares: 0,
        credomatic: 0,
        visa: 0,
        visaOnline: 0,
        visaDolares: 0,
        masterCard: 0,
        crediCuotas: 0,
        visaCuotas: 0,
        valorEnvioEfectivo: 0,
        lifeMilesNumber: 0,
        lifeMilesValor: 0,
        exencionIva: 0,
        loyalty: 0,
        gastosAutorizados: 0,
        retirosMercaderia: 0,
        ventaEnLinea: 0,
        notaDeCredito: 0,
        faltante: 0,
        cuadreDeCaja: 0,
        diferencia: 0,
        cashback: 0,
        giftcard: 0,
        observaciones: "-",
    }]);

    console.log(dataSales, vendor);

    const classes = useStyles();
    const steps = getSteps();

    let datos = [];
    const manager = { value: '', label: 'Encargado' };
    const value = { value: 'Selecciona un colaborador', label: 'Selecciona un colaborador' };

    getCollaboration().then((res) => { _data(res) });
    let _data = (stores) => {
        stores.map(res => datos.push({ value: res.name, label: res.name }))
    }

    function handleChangeData(event, name) {
        const values = [...dataSales];
        if (event.target.value == "") {
            values[0][name] = 0;
        } else {
            values[0][name] = event.target.value;
        }
        setdataSales(values);
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <>
                        <MDBRow style={{ justifyContent: "center", display: "flex" }}>
                            <MDBCol md='2'>
                                <MDBInput label='Venta diaria' type='text' value={dataSales[0].venta_diaria} onChange={e => handleChangeData(e, "venta_diaria")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='No. personas' type='text' value={dataSales[0].no_personas} onChange={e => handleChangeData(e, "no_personas")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='No. Ventas' type='text' value={dataSales[0].no_ventas} onChange={e => handleChangeData(e, "no_ventas")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Meta Diaria' type='text' value={dataSales[0].meta} onChange={e => handleChangeData(e, "meta")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Venta Anterior' type='text' value={dataSales[0].venta_anterior} onChange={e => handleChangeData(e, "venta_anterior")} />
                            </MDBCol>
                            <MDBCol md='2' style={{ marginTop: "26px" }}>
                                <Select
                                    onChange={e => handleChangeData(e, "collaboration")}
                                    defaultValue={manager}
                                    options={datos}
                                />
                            </MDBCol>
                            <MDBCol md='12'>
                            <MDBInput
                                type='textarea'
                                rows='3'
                                label='Factores clave que afectan el comercio'
                                value={dataSales[0].observaciones} onChange={e => handleChangeData(e, "factoresDeVenta")}
                            />
                        </MDBCol>
                        </MDBRow>
                    </>
                );
            case 1:
                return (
                    <>
                        <MDBCol md="4">
                            <Button color='primary' onClick={() => handleAdd()}><MDBIcon icon="plus" />Agregar Vendedor</Button>
                        </MDBCol>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            {vendor.map((field, idx) => {
                                return (
                                    <MDBCol md="4" key={`${field}-${idx}`}>
                                        <MDBRow style={{ justifyContent: "center", display: "flex" }}>
                                            <MDBCol md='7' style={{ marginTop: "26px" }}>
                                                <Select
                                                    onChange={e => handleChangeVendors(idx, e, "nombre")}
                                                    defaultValue={value}
                                                    options={datos}
                                                />
                                            </MDBCol>
                                            <MDBCol md='3'>
                                                <MDBInput label='total' type='text' validate onChange={e => handleChangeVendors(idx, e, "venta")} />
                                            </MDBCol>
                                            <MDBCol md='2' style={{ paddingLeft: "0px", paddingTop: "20px" }}>
                                                {idx !== 0 && (<MDBBtn size="sm" color='danger' onClick={() => handleRemove(idx)}>X</MDBBtn>)}
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>
                                )
                            })}
                        </MDBRow>
                    </>
                );
            case 2:
                return (
                    <MDBRow style={{ justifyContent: "center", display: "flex" }}>
                        <MDBCol md='4'>
                            Factura De Sistema
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Desde' type='text' value={dataSales[0].facturas_sis_desde} onChange={e => handleChangeData(e, "facturas_sis_desde")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Hasta' type='text' value={dataSales[0].facturas_sis_hasta} onChange={e => handleChangeData(e, "facturas_sis_hasta")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Total' type='text' value={dataSales[0].facturas_sis_total} onChange={e => handleChangeData(e, "facturas_sis_total")} />
                        </MDBCol>

                        <MDBCol md='4'>
                            Factura Manual
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Desde' type='text' value={dataSales[0].facturas_man_desde} onChange={e => handleChangeData(e, "facturas_man_desde")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Hasta' type='text' value={dataSales[0].facturas_man_hasta} onChange={e => handleChangeData(e, "facturas_man_hasta")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Total' type='text' value={dataSales[0].facturas_man_total} onChange={e => handleChangeData(e, "facturas_man_total")} />
                        </MDBCol>

                        <MDBCol md='4'>
                            Factura COD
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Desde' type='text' value={dataSales[0].facturas_cod_desde} onChange={e => handleChangeData(e, "facturas_cod_desde")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Hasta' type='text' value={dataSales[0].facturas_cod_hasta} onChange={e => handleChangeData(e, "facturas_cod_hasta")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Total' type='text' value={dataSales[0].facturas_cod_total} onChange={e => handleChangeData(e, "facturas_cod_total")} />
                        </MDBCol>

                        <MDBCol md='4'>
                            Notas De Crédito
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Desde' type='text' value={dataSales[0].facturas_nota_desde} onChange={e => handleChangeData(e, "facturas_nota_desde")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Hasta' type='text' value={dataSales[0].facturas_nota_hasta} onChange={e => handleChangeData(e, "facturas_nota_hasta")} />
                        </MDBCol>
                        <MDBCol md='2'>
                            <MDBInput label='Total' type='text' value={dataSales[0].facturas_nota_total} onChange={e => handleChangeData(e, "facturas_nota_total")} />
                        </MDBCol>
                    </MDBRow>
                );
            case 3:
                return (
                    <>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            1. Efectivo
                    </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            <MDBCol md='3'>
                                <MDBInput label='Efectivo En Quetzáles' type='text' value={dataSales[0].efectivoQuetzales} onChange={e => handleChangeData(e, "efectivoQuetzales")} />
                            </MDBCol>
                            <MDBCol md='3'>
                                <MDBInput label='Efectivo En Doláres(Quetzáles)' type='text' value={dataSales[0].efectivoQuetzalesDolares} onChange={e => handleChangeData(e, "efectivoQuetzalesDolares")} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            2. Tarjetas
                    </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            <MDBCol md='2'>
                                <MDBInput label='Credomatic' type='text' value={dataSales[0].credomatic} onChange={e => handleChangeData(e, "credomatic")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Visa' type='text' value={dataSales[0].visa} onChange={e => handleChangeData(e, "visa")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Visa Online' type='text' value={dataSales[0].visaOnline} onChange={e => handleChangeData(e, "visaOnline")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Visa Doláres' type='text' value={dataSales[0].visaDolares} onChange={e => handleChangeData(e, "visaDolares")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Master Card' type='text' value={dataSales[0].masterCard} onChange={e => handleChangeData(e, "masterCard")} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            3. Cuota
                    </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            <MDBCol md='2'>
                                <MDBInput label='Credi Cuotas' type='text' value={dataSales[0].crediCuotas} onChange={e => handleChangeData(e, "crediCuotas")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Visa Cuotas' type='text' value={dataSales[0].visaCuotas} onChange={e => handleChangeData(e, "visaCuotas")} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            4. Envios
                    </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            <MDBCol md='2'>
                                <MDBInput label='Valor De Envio Efectivo' type='text' value={dataSales[0].valorEnvioEfectivo} onChange={e => handleChangeData(e, "valorEnvioEfectivo")} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            5. Especiales
                    </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            <MDBCol md='2'>
                                <MDBInput label='Life Miles Número' type='text' value={dataSales[0].lifeMilesNumber} onChange={e => handleChangeData(e, "lifeMilesNumber")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Life Miles Valor' type='text' value={dataSales[0].lifeMilesValor} onChange={e => handleChangeData(e, "lifeMilesValor")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Exención Iva' type='text' value={dataSales[0].exencionIva} onChange={e => handleChangeData(e, "exencionIva")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Loyalty' type='text' value={dataSales[0].loyalty} onChange={e => handleChangeData(e, "loyalty")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Gasto Autorizados Valor' type='text' value={dataSales[0].gastosAutorizados} onChange={e => handleChangeData(e, "gastosAutorizados")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Retiros De Mercadería' type='text' value={dataSales[0].retirosMercaderia} onChange={e => handleChangeData(e, "retirosMercaderia")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Venta En Línea Total' type='text' value={dataSales[0].ventaEnLinea} onChange={e => handleChangeData(e, "ventaEnLinea")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Nota De Crédito' type='text' value={dataSales[0].notaDeCredito} onChange={e => handleChangeData(e, "notaDeCredito")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Faltante' type='text' value={dataSales[0].faltante} onChange={e => handleChangeData(e, "faltante")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Cuadre De Caja' type='text' value={dataSales[0].cuadreDeCaja} onChange={e => handleChangeData(e, "cuadreDeCaja")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Diferencias' type='text' value={dataSales[0].diferencia} onChange={e => handleChangeData(e, "diferencia")} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            6. Certificados
                    </MDBRow>
                        <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                            <MDBCol md='2'>
                                <MDBInput label='Valor Cashback' type='text' value={dataSales[0].cashback} onChange={e => handleChangeData(e, "cashback")} />
                            </MDBCol>
                            <MDBCol md='2'>
                                <MDBInput label='Valor Gift Card' type='text' value={dataSales[0].giftcard} onChange={e => handleChangeData(e, "giftcard")} />
                            </MDBCol>
                        </MDBRow>
                    </>
                );
            case 4:
                return (
                    <MDBRow style={{ justifyContent: "left", display: "flex" }}>
                        <MDBCol md='12'>
                            <MDBInput
                                type='textarea'
                                rows='3'
                                label='Observaciones del día'
                                value={dataSales[0].observaciones} onChange={e => handleChangeData(e, "observaciones")}
                            />
                        </MDBCol>
                    </MDBRow>)
            default:
                return 'Ooooups! Este paso no existe';
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    function handleChangeVendors(i, event, name) {
        const values = [...vendor];
        if (event.target.value == "") {
            values[i][name] = null;
        } else {
            values[i][name] = event.target.value;
        }
        setVendor(values);
    }

    function handleAdd() {
        const values = [...vendor];
        values.push({ nombre: "", venta: 0 });
        setVendor(values);
    }

    function handleRemove(i) {
        if (i !== 0) {
            const values = [...vendor];
            values.splice(i, 1);
            setVendor(values);
        }
    }

    return (
        <Layaout>
            <br></br>
            <CardHeader title="Tickets" icon="ticket-alt">
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>All steps completed</Typography>
                                <Button onClick={handleReset}>Reset</Button>
                            </div>
                        ) : (
                                <div>
                                    <Typography className={classes.instructions} component={'span'} variant={'body2'}>{getStepContent(activeStep)}</Typography>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                        >
                                            Regresar
              </Button>
                                        <Button variant="contained" color="primary" onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Terminar' : 'Siguente'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>

            </CardHeader>
        </Layaout>
    )
}

export default TransferSystemPage;