import '../App.css';


export const NextSteps = () => {

  const nextSteps = [{title : 'Analyze sales trends over time', content : 'Explore or analyze data'},
  {title : 'Investigate the impact of challenges on revenue', content : 'Explore or analyze data'}]

  const renderNextSteps = (nextSteps: any[]) => {
    return nextSteps.map((step: any) => {
      return (
        <div className='sophia-next-step'>
          <h3>{step.title}</h3>
          <p>{step.content}</p>
        </div>
      )
    })
  }

  return (
    <div className='sophia-next-steps'>
      <h2 className='sophia-next-steps-title'>Suggested Next Steps</h2>
      {renderNextSteps(nextSteps)}
    </div>
  );

}
