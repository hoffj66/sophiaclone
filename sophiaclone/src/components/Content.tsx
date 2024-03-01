import '../App.css';
import { BarChartExample } from './BarChartExample';
import { PieChartExample } from './PieChartExample';
import { Description } from './Description';


interface IQuery {
  type: string;
  by: string;
  description: string;
}

interface IContentProps {
  dataset: string;
  queries: IQuery[];
  description: string;
}

const Content = (props: IContentProps) => {

  const { dataset, queries } = props;

  const renderQueries = (queries: IQuery[], dataset: string) => {
    return queries.map((query: IQuery) => {
      return (
        <>
          <BarChartExample query={query} dataset={dataset} />
        </>

      )
    })
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
      <Description description={props.description} />
      {renderQueries(queries, dataset)}
    </div>
  );
}
export default Content;