import React from 'react'
import { Table } from 'react-bootstrap'


const TablaClientes = ({customers}) => {
  return (
    <div>
     <Table responsive="lg">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Tipo Persona</th>
                    <th>Tipo Licencia</th>
                    <th>Pais</th>
                </tr>
                </thead>
                <tbody>
                    <>
                    {customers.map( c => (
                        <tr key={c.IdCliente}>
                          <td>{c.IdCliente}</td>
                          <td>{c.NomTipoPersonaCliente}</td>
                          <td>{c.NomTipoLicencia}</td>
                          <td>{c.NomPais}</td>
                        </tr>))}
                    </>
                </tbody>
                
          </Table>  
    </div>
  )
}

export default TablaClientes