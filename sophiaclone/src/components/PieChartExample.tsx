import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';


interface IQuery {
  type: string;
  by: string;
  description: string;
}

interface IContentProps {
  dataset: string;
  query: IQuery;
}

export const PieChartExample = (props: IContentProps) => {

  const { query, dataset } = props

  const [data, setData] = useState([])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#0088FE', '#00C49F', '#FFBB28', '#FF8042','#0088FE', '#00C49F', '#FFBB28', '#FF8042','#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

    <div style={{ backgroundColor: "white", margin: "20px", textAlign: "center"}}>
      <h3>{query.description}</h3>
      <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
    </div>


  );

}
