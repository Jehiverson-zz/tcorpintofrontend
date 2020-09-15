import axios from 'axios'
export const login = (user) => {

  let url = process.env.REACT_APP_URL_BASE + "/login";
  const data = { user: user.user,password: user.password};
  return axios
    .post(url,data)
    .then(response => {
      localStorage.setItem('usertoken', response.data);
      localStorage.setItem('session',true);
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('token', response.data.token);
    
      let data = { error: 0, message: "Exito", response }; 
      return data;
    })
    .catch(err => {
      console.log(err.response.data)
      let data = { error: 1, message: err.response.data.message };
      return data;
    })
}

export const login_google = user => { 

  let url = process.env.REACT_APP_URL_BASE + "/login/google";
  const data = { user: user.email};
  return axios
    .post(url,data) 
    .then(response => {

      localStorage.setItem('usertoken', response.data);
      localStorage.setItem('session',true);
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('token', response.data.token);

      let data = { error: 0, message: "Exito" }; 
      return data;
    })
    .catch(err => {
      console.log(err.response.data)
      let data = { error: 1, message: err};
      return data;
    })
}

export const data = () => {

  let url = process.env.REACT_APP_URL_BASE + "/";
  let data = {};
  return axios
    .post(url,data,{
      headers: { token: localStorage.getItem('usertoken') }
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err)
      let data = { error: 0, message: "Error, comunicarse con su administrador" };
      return data;
    })
}
