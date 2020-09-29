import axios from 'axios'

const url = process.env.REACT_APP_URL_BASE;

/* Guarda un registro de mercaderia dañada */
export const storeDamagedMerchandise = (data) => {
    return axios
        .post(`${url}/damaged_merchandise/create`, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        })
}

/* Obtiene todos los datos de mercadería dañada de una tienda*/
export const getDamagedMerchandise = () => {
    const data = {store : localStorage.getItem("store")}
    return axios
        .post(`${url}/damaged_merchandise`, data)
        .then((response) => {
            console.log(response);
            return response.data.damaged;
        })
        .catch((error) => {
            console.error(error);
        })
}