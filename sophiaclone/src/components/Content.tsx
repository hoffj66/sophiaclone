import '../App.css';
import { BarChartExample } from './BarChartExample';
import { Description } from './Description';
import { NextSteps } from './NextSteps';


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
    <div className='sophia-content'>
      <div className='sophia-content-left'>
        <Description description={props.description} />
      </div>
      <div className='sophia-content-middle'>
        {renderQueries(queries, dataset)}
      </div>
      <div className='sophia-content-right'>
        <NextSteps />
      </div>
      
    </div>
  );
}
export default Content;