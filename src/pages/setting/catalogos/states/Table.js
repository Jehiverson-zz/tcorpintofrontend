import React from 'react';
import dateFormat from 'dateformat'
import CurrencyFormat from 'react-currency-format';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
//Funciones
import { deleteDataSales } from '../../../../functions/salesFunctions'
const Tablebinnacle = ({ posts, loading, toggleModal }) => {
  const history = useHistory();
  if (loading) {
    return <h2>Cargando Datos...</h2>;
  }

  const handleNext = (id) => {

    Swal.fire({
      title: 'Está seguro de eliminar este dato de venta?',
      text: 'Ya no podrá recuperar este dato de venta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        deleteDataSales(id)
          .then((res) => {
            if (res.response) {
              Swal.fire(
                'Eliminado',
                'El dato fue eliminado',
                'success'
              )
              history.go(0)
            } else {
              Swal.fire(
                'Error',
                'No se pudo eliminar el dato de venta',
                'error'
              )
            }
          }
          )
          .catch(err =>
            console.log("error"))

      }
    })
  };

  return (
    posts.map((post, i) => (
      <tr key={i}>
        <td>{post.name}</td>
        <td>{post.status}</td>
        <td>{dateFormat(post.timestamp, 'dd/mm/yyyy')}</td>
        <td>
        <Button variant="contained" color="primary" onClick={() => toggleModal(
          post.name,
          {value: post.status, label: post.status}
        )}>Editar</Button>&nbsp;
        <Button variant="contained" color="primary" onClick={() => handleNext(post.id)}>Eliminar</Button>
        </td>
       </tr>
    ))
  );
};

export default Tablebinnacle;