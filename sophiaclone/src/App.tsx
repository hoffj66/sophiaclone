import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/Content'
import { useEffect, useState } from 'react'

function App() {

  const [dataset, setDataset] = useState<string>("ev.csv");
  const [dataSnippet, setDataSnippet] = useState<any[]>([]);
  const [outPrompt, setOutPrompt] = useState<string>("");
  const [queryPrompt, setQueryPrompt] = useState<string>("");
  const [description, setDescription] = useState<string>("<div></div>");
  const [queries, setQueries] = useState<any[]>([]);
  const [question, setQuestion] = useState<string>("What would you like to explore today?");

  const onSelect = (e: any) => {
    setDataset(e.currentTarget.value);
  }

  const onDescriptionChange = (e: any) => {
    setDescription(e.currentTarget.value);
  }

  const onQueriesChange = (e: any) => {
    setQueries(JSON.parse(e.currentTarget.value));
  }

  const onQuestionChange = (e: any) => {
    setQuestion(e.currentTarget.value);
  }

  useEffect(() => {
    fetch(`http://localhost:3000/?dataset=${dataset}`)
      .then(response => response.json())
      .then((_data) => {
        setDataSnippet(_data.data)
      })
  }, [dataset])

  useEffect(() => {
    setOutPrompt(`I am a bot that gives a description of a dataset based on a subset of the data. \n\nDATA : ${JSON.stringify(dataSnippet)}\n\nDESCRIPTION : `)
    setQueryPrompt(`
        I am a bot that can generate helpful search queries for datasets.  Currently, the only processing that is available is to get a 'count' of items in the set based on the metadata.  The queries will be a request in JSON array format.  The data is only a small subset and should be assumed that much more data exists in the set.  The queries should be most relevant to the QUESTION.

        DATA:  [{"Name" : "James Smith", "Net Worth" : 39000.00, "City" : "Chapel Hill", "Political Party" : "D"},{"Name" : "Jane Miller", "Net Worth" : 50000.00, "City" : "Carrboro","Political Party" : "R"}]
        
        QUESTION: Of the people who live in San Diego, what is the distribution of political parties?

        QUERIES:
        
        [
         {"type" : "count", "by" : "City", "description" : "Number of people that live in a certain City"},
         {"type" : "count", "by" : "Political Party", "description" : "Number of people in a specific political party"}
        ]
        
        DATA: ${JSON.stringify(dataSnippet)}\n\n

        QUESTION: ${question}

        QUERIES: 
        `)
  }, [question])


return (
  <div className='app'>
    <Header onSelect={onSelect} onDescriptionChange={onDescriptionChange} onQueriesChange={onQueriesChange} dataset={dataset} outPrompt={outPrompt} queryPrompt={queryPrompt} queries={queries} question={question} onQuestionChange={onQuestionChange} />
    <Content dataset={dataset} queries={queries} description={description} />
    <Footer />
  </div>
)
}

export default App
