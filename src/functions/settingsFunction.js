import axios from 'axios'

const url = process.env.REACT_APP_URL_BASE;

/*Muestra los datos de retiros*/
export const statesShow = (store) => {
    return axios
    .post(url + '/statusShow')
    .then((response) => {
        return response.data.showStatusInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

export const statesCreate = (data) => {
    return axios
    .post(url + '/statusCreate',data)
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros*/
export const CollaboratorShow = (store) => {
    return axios
    .post(url + '/collaboratorShow')
    .then((response) => {
        console.log(response.data.showCollaboratorInfo);
        return response.data.showCollaboratorInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

export const collaboratorCreate = (data) => {
    return axios
    .post(url + '/collaboratorCreate',data)
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

export const collaboratorUpdate = (data) => {
    return axios
    .put(url + '/collaboratorUpdate',data)
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros*/
export const UserShow = (store) => {
    return axios
    .post(url + '/userShow')
    .then((response) => {
        console.log(response.data.showUserInfo);
        return response.data.showUserInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

/* SUBSIDIARIAS */

/*Muestra los datos de subsidiarias*/
export const SubsidiariasShow = (store) => {
    return axios
    .post(url + '/subsidiariaShow')
    .then((response) => {
        console.log(response.data.subsidiarias);
        return response.data.subsidiarias;
    })
    .catch((error) => {
        console.log(error);
    })
};

export const subsidiariaCreate = (data) => {
    return axios
    .post(url + '/subsidiariaCreate',data)
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

export const subsidiariaUpdate = (data) => {
    return axios
    .put(url + '/subsidiariaUpdate',data)
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

export const storeCreate = (data) => {
    return axios
    .post(url + '/storeCreate',data)
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

export const storeUpdate = (data) => {
    return axios
    .put(url + '/storeUpdate',data)
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};