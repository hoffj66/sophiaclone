import '../App.css';

interface IContentProps {
  description: string;
}

export const Description = (props : IContentProps) => {

  const { description } = props;

  return (
    <div  className='sophia-description' dangerouslySetInnerHTML={{__html: description}}>
        
    </div>
    
  );
}