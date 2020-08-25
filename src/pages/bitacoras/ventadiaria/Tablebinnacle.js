import React from 'react';
import dateFormat  from 'dateformat'

const Tablebinnacle = ({ posts, loading }) => {
  if (loading) {
    return <h2>Cargando Datos...</h2>;
  }

  return (
   
      posts.map((post, i) => (
        <tr key={i}>
                  <td>{post.sale_daily}</td>
                  <td>{post.daily_goal}</td>
                  <td>{post.manager}</td>
                  <td> {dateFormat(post.date_created,'dd/mm/yyyy')} </td> 
        </tr>
      ))
  );
};

export default Tablebinnacle;