import axios from 'axios'

const url = process.env.REACT_APP_URL_BASE;

/* Crea un nuevo ticket para transferir a otra tienda */
export const storeTicketsSystemTransfer = (data) => {
    return axios
        .post(`${url}/tickets/add/transfer`, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        })
}
/* Crea un nuevo ticket de retiros inmediatos */
export const storeTicketInmediates = (data) => {
    console.log(`AXIOS=========== ${data}`);
    return axios
        .post(`${url}/tickets/add/inmediates`, {data}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        })
}

/* Crea un nuevo ticket de retiros fotografía */
export const storeTicketPhotoRetrats = (data) => {
    return axios
        .post(`${url}/tickets/add/photo_retreats`, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        })
}

/* Crea un nuevo ticket de retiros externos */
export const storeTicketExternalRetrats = (data) => {
    return axios
        .post(`${url}/tickets/add/external_retreats`, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        })
}

/* Obtiene la data de movimientos de tikets entre tiendas */
export const getTicketsSystemTransferCreated = () => {
    const data = JSON.parse(localStorage.getItem("identity"))
    return axios
        .post(`${url}/tickets/transfer_created`, data)
        .then((response) => {
            return response.data.ticketSystem;
        })
        .catch((error) => {
            console.error(error);
        })
}

/* Obtiene la data de movimientos de tikets entre tiendas */
export const getTicketsSystemTransferAssigned = () => {
    const data = JSON.parse(localStorage.getItem("identity"))
    return axios
        .post(`${url}/tickets/transfer_assigned`, data)
        .then((response) => {
            return response.data.ticketSystem;
        })
        .catch((error) => {
            console.error(error);
        })
}

/* Obtiene la data de movimientos de tikets entre tiendas */
export const getPhotoRetreats = () => {
    const data = JSON.parse(localStorage.getItem("identity"))
    return axios
        .post(`${url}/tickets/photo_retreats`, data)
        .then((response) => {
            return response.data.ticketPhotoRetrats;
        })
        .catch((error) => {
            console.error(error);
        })
}

/* Obtiene la data de los tickets retiros externos */
export const getExternalRetreats = () => {
    const data = JSON.parse(localStorage.getItem("identity"))
    return axios
        .post(`${url}/tickets/external_retreats`, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        })
}

/* Obtiene todas las tiendas */
export const getStore = () => {
    return axios
        .get(`${url}/tickets/stores`)
        .then((response) => {
            //console.log(response);
            return response.data.result;
        })
        .catch((error) => {
            console.log(error);
        })
}

/* Inactiva un ticket de traslado de sistema*/
export const inactivateTicket = (id) =>{
    return axios
    .put(`${url}/ticket/inactive/${id}`)
    .then((response) => {
        return response
    })
    .catch((error)=>{
        console.log(error)
    })
}

/* Inactiva un ticket de fotos retiradas*/
export const inactivatePhotoRetreats = (id) =>{
    return axios
    .put(`${url}/ticket/photo_retreats/inactive/${id}`)
    .then((response) => {
        return response
    })
    .catch((error)=>{
        console.log(error)
    })
}

/* Inactiva un ticket de retiros externos*/
export const inactivateExternalRetreats = (id) =>{
    return axios
    .put(`${url}/ticket/external_retreats/inactive/${id}`)
    .then((response) => {
        return response
    })
    .catch((error)=>{
        console.log(error)
    })
}

/* Cambia el estado de un ticket de traslado de sistema a 'Completado' */
export const completeTicket = (id) =>{
    return axios
    .put(`${url}/ticket/complete/${id}`)
    .then((response) => {
        return response
    })
    .catch((error)=>{
        console.log(error)
    })
}
/* Cambia el estado de un ticket de fotos retiradas a 'Completado' */
export const completePhotoRetreats = (id) =>{
    return axios
    .put(`${url}/ticket/photo_retreats/complete/${id}`)
    .then((response) => {
        return response
    })
    .catch((error)=>{
        console.log(error)
    })
}