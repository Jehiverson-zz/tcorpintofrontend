import React from 'react';
import dateFormat from 'dateformat';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
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
          {value: post.status, label: post.status},
          post._id
        )}>Editar</Button>
        </td>
       </tr>
    ))
  );
};

export default Tablebinnacle;