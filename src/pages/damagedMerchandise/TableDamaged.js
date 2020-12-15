import React from 'react';
import dateFormat  from 'dateformat'

const TableDamaged = ({ posts, loading }) => {
  if (loading) {
    return <tr><td colSpan="12"><center>Cargando Datos...</center></td></tr>;
  }

  return (
   
      posts.map((post, i) => (
        <tr key={i}>
                  <td>{post.damage}</td>
                  <td>{post.upc}</td>
                  <td>{post.alu}</td>
                  <td>{post.siz}</td>
                  <td>{post.price}</td>
                  <td>{post.store_created}</td>
                  <td>{dateFormat(post.timestamp,'dd/mm/yyyy')}</td>
        </tr>
      ))
  );
};

export default TableDamaged;