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

  return (
    posts.map((post, i) => (
      <tr key={i}>
        <td>{post.name}</td>
        <td>{post.status}</td>
        <td>{dateFormat(post.timestamp, 'dd/mm/yyyy')}</td>
        <td>
        <Button variant="contained" color="primary" onClick={() => toggleModal(
          post.name,
          post._id,
          post.status
        )}>Editar</Button>&nbsp;
        </td>
       </tr>
    ))
  );
};

export default Tablebinnacle;