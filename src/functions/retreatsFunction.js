import axios from 'axios'

const url = process.env.REACT_APP_URL_BASE;

/*Muestra los datos de retiros*/
export const retreatShow = (store) => {
    return axios
    .post(url + '/retreatsShow', {"store": store})
    .then((response) => {
        console.log(response.data.showRetreatsInfo);
        return response.data.showRetreatsInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros Lista*/
export const retreatShowList = (store) => {
    return axios
    .post(url + '/retreatsDebtShowList', {"store": store})
    .then((response) => {
        console.log(response.data.showRetreatsInfo);
        return response.data.showRetreatsInfo;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros Lista*/
export const retreatShowListHistory = (store) => {
    console.log("datos");
    return axios
    .post(url + '/retreatsDebtShowListHistory', {"store": store})
    .then((response) => {
        console.log(response.data);
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Muestra los datos de retiros Lista*/
export const retreatShowBinacleList = (collaborator) => {
    return axios
    .post(url + '/retreatsBinacleList', {"collaborator": collaborator})
    .then((response) => {
        console.log(response)
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Crear los datos de retiros*/
export const retreatCreated = (data) => {
    let formData = new FormData();
    formData.append('file',data.image);
    formData.append('data',JSON.stringify(data));

    return axios
    .post(url + '/createdUpdate', formData, {
        headers:{
            'Content-type': 'multipart/form-data'
        }
    })
    .then((response) => {
        console.log(response);
        var data = [];
        if(response.status === 200){
            data.push({status: "success", type: "Ingresado", message: "Retiro creado con éxito."});
        }else{
            data.push({status: "error", type: "Error", message: "El retiro tuvo un error, prueba de nuevo."});
        }
        return {data: data};
    })
    .catch((error) => {
        console.log(error);
    })
};


/*Actuliza los datos de retiros*/
export const retreatUpdate = (id, action) => {
    return axios
    .post(url + '/retreatsUpdate', {"id": id, "action": action})
    .then((response) => {
        return {data: "success", action: response.action };
    })
    .catch((error) => {
        console.log(error);
    })
};

/*Actuliza los datos de retiros la deuda total*/
export const retreatUpdateRemove = (datos) => {
    console.log("entro");
    return axios
    .post(url + '/retreatsUpdateRove', {"datos": datos})
    .then((response) => {
        console.log(response);
        return {message:response.data.message, type:response.data.type, tittle: response.data.tittle};
    })
    .catch((error) => {
        console.log("1");
        console.log(error);
    })
};





