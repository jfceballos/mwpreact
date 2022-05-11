import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getHoldings } from '../../features/asset'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const HoldingsTable = () => {
    const dispatch = useDispatch();
    const [holdings, setHoldings] = useState([]);

    useEffect(() => {
        dispatch(getHoldings())
            .unwrap()
            .then((result) => {
                setHoldings(result)
            })  
    },[dispatch]) 

  return (
    <div key='sectionHolding' className='cst sectionAsset'>
        <Table key='holdingTable'>
            <tbody>
                {holdings.map ( h => (
                    <>
                    <tr>
                        <td>{h.SecTypeName}</td>
                    </tr>
                    </>
                ) )}
            </tbody>
        </Table>
    </div>
  )
}

export default HoldingsTable