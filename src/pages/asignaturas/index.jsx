import React from 'react';
import Asignaturas from '../../components/asignaturas/Asignaturas';
import Layout from '../../components/layout/Layout';

const AsignaturasPage = () => {
  return ( <Layout children={<Asignaturas />} /> )
}

export default AsignaturasPage;
