import axios from 'axios'

const url = process.env.REACT_APP_URL_BASE;

/* Obtiene la data de movimientos de tikets entre tiendas */
export const getTicketsSystemTransfer = (/*Parametro es la tienda*/) => {
    return axios
        .get(url + '/tickets/transfer')
        .then((response) => {
            //console.log(response);
        })
        .catch((error) => {
            //console.log(error);
        })
}

export const getStore = () => {
    return axios
        .get(url + '/tickets/stores')
        .then((response) => {
            //console.log(response);
            return response.data.result;
        })
        .catch((error) => {
            console.log(error);
        })
}