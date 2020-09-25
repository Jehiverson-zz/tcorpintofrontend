import React from 'react';
import dateFormat  from 'dateformat'
import CurrencyFormat from 'react-currency-format';

const Tablebinnacle = ({ posts, loading }) => {
  if (loading) {
    return <h2>Cargando Datos...</h2>;
  }

  return (
   
      posts.map((post, i) => (
        <tr key={i}>
                  <td><CurrencyFormat value={post.ventas} displayType={'text'} prefix={'Q'} /></td>
                  <td><CurrencyFormat value={post.metas} displayType={'text'} prefix={'Q'} /></td> 
                  <td>{post.manager}</td>
                  <td>{dateFormat(post.fechaCreacion,'dd/mm/yyyy')}</td>
        </tr>
      ))
  );
};

export default Tablebinnacle;