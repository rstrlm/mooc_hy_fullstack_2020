import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
  <div>
    <h1>Anecdote of the day</h1>
    <p>{props.anecdotes[props.selected]}<br></br>has {props.vote[props.selected]} votes</p>
  </div>
  )
}

const MostVotes = (props) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[props.index]}<br></br>has {props.vote[props.index]} votes</p>
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))
  const [maxVotes, setMaxVotes] = useState(0);

  const handleSelectedclick = () => {
    let rnd = Math.floor(Math.random() * anecdotes.length)
    return (
      setSelected(rnd)
      )
  }
  const handleVoteClick = () => {
      const copy = {...vote}
      copy[selected] +=1;
      checkMaxVotes({copy})
      return (
        setVote(copy)
      )
  }
  
  const checkMaxVotes = (props) => {
  var maxI = 0;
  var max = props.copy[0]
  for(var i = 0; i < anecdotes.length; i++) {
    if(props.copy[i] >= max ) {
      maxI= i
      max = props.copy[i]
    }
  }
  console.log("maxI", maxI)
  return (setMaxVotes(maxI))

} 
  return (
    <div>
      <Header anecdotes={anecdotes} vote={vote} selected={selected}/>
      <Button onClick={handleVoteClick} text="vote" /> 
      <Button onClick={handleSelectedclick} text="next anectode"/>  
      <MostVotes vote={vote} anecdotes={anecdotes} index={maxVotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)