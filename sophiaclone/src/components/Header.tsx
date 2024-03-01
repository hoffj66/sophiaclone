import FileUploader from "./FileUploader";

const Header = (props : any) => {
  
  const radios = () => {
    return(
      <form>
        <div className="radio">
          <label>
            <input type="radio" value="ev.csv" checked={props.dataset === 'ev.csv'} onChange={props.onSelect}/>
            ev.csv
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="crime.csv" checked={props.dataset === 'crime.csv'} onChange={props.onSelect}/>
            crime.csv
          </label>
        </div>
        
      </form>
    )
  }

  return (
    <div className="header">
      <div style={{ padding: "100px", textAlign: "center", color: "white" }}>
        <h1>Exploration Website</h1>
        <p>Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
          Phasellus imperdiet, nulla et dictum interdum,
          nisi lorem egestas odio,
          vitae scelerisque enim ligula venenatis dolor.</p>
        <textarea style={{ width: "800px", height: "100px" }} onChange={props.onQuestionChange} value={props.question} />
        <FileUploader />
        {radios()}
        <textarea style={{ width: "800px", height: "1000px" }} value = {props.outPrompt}/>
        <textarea style={{ width: "800px", height: "1000px" }} onChange={props.onDescriptionChange}>Description Prompt</textarea>
        <textarea style={{ width: "800px", height: "1000px" }} value = {props.queryPrompt}/>
        <textarea style={{ width: "800px", height: "1000px" }} onChange={props.onQueriesChange}>Query Prompt</textarea>
      </div>
    </div>
  )
}

export default Header;