import axios from 'axios'

const url = process.env.REACT_APP_URL_BASE;

/*Muestra los datos de retiros*/
export const statesShow = (store) => {
    return axios
    .post(url + '/showStates')
    .then((response) => {
        console.log(response.data.showRetreatsInfo);
        return response.data.showRetreatsInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros*/
export const CollaboratorShow = (store) => {
    return axios
    .post(url + '/showCollaborator')
    .then((response) => {
        console.log(response.data.showRetreatsInfo);
        return response.data.showRetreatsInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros*/
export const UserShow = (store) => {
    return axios
    .post(url + '/showUser')
    .then((response) => {
        console.log(response.data.showRetreatsInfo);
        return response.data.showRetreatsInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

