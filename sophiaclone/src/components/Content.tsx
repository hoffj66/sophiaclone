import { useEffect, useState } from 'react';
import BarChartExample from './BarChartExample';
import axios from 'axios';
import '../App.css';

const Content = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000').then(response => {
      console.log(response)
      setData(response.data)
    }).catch(err => {
      console.log(err)
    })}, []
  );


  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
      <img src="/overview.png" alt="image" style={{ height: "728px", width: "350px", margin: "20px" }} />
      <BarChartExample />
      <BarChartExample />
      <BarChartExample />
      <BarChartExample />

    </div>
  );
}
export default Content;