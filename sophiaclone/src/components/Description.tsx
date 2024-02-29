import '../App.css';

interface IContentProps {
  description: string;
}

export const Description = (props : IContentProps) => {

  const { description } = props;

  return (
    <div style={{backgroundColor : "white", width:"300px", padding : "30px"}}>
        <h3>Description: </h3>
        <p >{description}</p>
    </div>
    
  );
}