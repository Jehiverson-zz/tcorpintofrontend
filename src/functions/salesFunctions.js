import axios from 'axios'

const url = process.env.REACT_APP_URL_BASE;

export const salesShow = () => {
  
    return axios
    .get(url + '/binnacles/sales_show')
    .then((response) => {
        return response.data.sales;
    })
    .catch((error) => {
        console.log(error);
    })

}

export const confirmdataVendors = (vendors, sale) => {
    let totalVendors = 0;

    vendors.map(res => totalVendors += parseFloat(res.venta) == ' ' ? 0 : parseFloat(res.venta))

    console.log("Aqui",totalVendors);
    if (totalVendors === parseFloat(sale)) {
        let message = ""
        return {message:message, status:true}
    } else {
        let message = "Los datos ingresados no cuadran, datos de vendedores es: " + totalVendors + " y la venta ingresada es: " + sale
        return {message:message, status:false}
    }

}

export const confirmdataInvoice = (sale) => {
    let totalInvoice = 0;
    
    totalInvoice = (parseFloat(sale.facturas_sis_total) + parseFloat(sale.facturas_man_total) + 
                   parseFloat(sale.facturas_cod_total))-parseFloat(sale.facturas_nota_total) 

    if(totalInvoice === parseFloat(sale.venta_diaria)){
        let message = ""
        return {message:message, status:true}
    }else{
        let message = "Los datos ingresados no cuadran, datos de facturación son: " + totalInvoice + " y la venta ingresada es: " + sale.venta_diaria
        return {message:message, status:false}
    }

    return totalInvoice;
}

export const confirmdataMethodPayment = (req, res) => {

    console.log(res)
    return true;
}

