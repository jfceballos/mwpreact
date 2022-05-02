import BootstratTable from 'react-bootstrap-table-next'
import paginationFactory  from 'react-bootstrap-table2-paginator'
import { columns, info } from './data'
import './cpa.scss'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';
  import { Bar, Doughnut  } from 'react-chartjs-2';
import ItemList from './ItemList';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  export const optionsChart = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'chartArea'
      }
    },
  };
  export const optionsChart2 = {
    responsive: true,
    plugins: {
      legend: {
        display: false 
      }
    }
  };
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];
  const monthValue = [ 50, 60, 70, 45, 15, 80]
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: monthValue,
        backgroundColor: 'rgba(24, 55, 12, 0.7)'
      }
    ],
  };

  export const data2 = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
         
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
         
        ],
        borderWidth: 2,
      },
    ],
  };

const CPA001001 = () => {

    const items = [{ title: "Initital Market Value", value: "191,558,136" },
    { title: "Final Market Value", value: "176,922,782" },
    { title: "Variation", value: "(13,294,895)" },
    { title: "Deposits/Withdrawals", value: "(1,249,999)" },
    { title: "Transfer In/Out", value: "1,912,367" },
    { title: "Profit/Loss", value: "(10,132,528)" },
    { title: "IRR", value: "1.64%" }]
 
   
      const options = {
        sizePerPage: 7,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: false,
        firstPageText: 'First',
        prePageText: '<'
      };  

  return (
    <div>
        <div className='row itemtab'>
            <ItemList items = { items } />
        </div>
        <div className="row col-md-12 section">
            <h3>Portfolio Overview</h3>
            <div className="col-md-4 m-md-3 bstable ">
                
                <BootstratTable 
                    keyField='AssetClass'
                    data = {info}
                    columns={columns}
                    bodyClasses="foo"
                   /*  pagination = {paginationFactory(options)}   */
                    responsive="sm"
                />
            </div>
            <div className="col-md-4  m-md-3 ">
                <strong>Performance Overview</strong>
                <Bar options={optionsChart} data={data} />
              
            </div>
            <div className="col-md-3 m-md-3 dona">
                <strong>Asset Class</strong>
               
                <Doughnut options={optionsChart2} data={data2} />;
            </div>
        </div>
    </div>
  )
}

export default CPA001001