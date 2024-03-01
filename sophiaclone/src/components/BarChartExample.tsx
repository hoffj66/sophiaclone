import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


interface IQuery {
  type: string;
  by: string;
  description: string;
}

interface IContentProps {
  dataset: string;
  query: IQuery;
}

export const BarChartExample = (props: IContentProps) => {

  const { query, dataset } = props

  const [data, setData] = useState([])

  const transform = (input: any): any => {
    return Object.entries(input).map((item: any) => {
      return {
        name: item[0],
        count: item[1]
      }
    })
  }

  useEffect(() => {
    fetch(`http://localhost:3000/count?by=${query.by}&dataset=${dataset}`)
      .then(response => response.json())
      .then(data => {
        const transformedData = transform(data.data)
        setData(transformedData)
      })
  }, [])

  return (

    <div style={{ backgroundColor: "white", margin: "20px", textAlign: "center" }}>
      <h3>{query.description}</h3>
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}

      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />

      </BarChart>
    </div>


  );

}
