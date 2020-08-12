import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Header = () => <h1>Give feedback</h1>

const Button = ({onClick, text}) => {
    return(
      <button onClick={onClick}>{text}</button>
    )
}
const StatisticLine = ({text, value}) => {
    return (
    <tr>
    <td>{text}</td> 
    <td>{value}</td>
    </tr>
    )
}
  
const Statistic = (props) => {
  let total = props.good + props.neutral + props.bad
  let avg = props.good*1 + props.neutral*0 + props.bad*-1
  let pct = (total - (total - props.good)) / total * 100 + " %";
  if(total === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
   return (
      <table>
        <tbody>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={avg / total} />
      <StatisticLine text="positive" value={pct} />
      </tbody>
      </table>
  )
}
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header/>
      <div>
        <Button onClick={handleGoodClick} text='Good' />
        <Button onClick={handleNeutralClick} text='Neutral' />
        <Button onClick={handleBadClick} text='Bad' />
      </div>
      <h1>statistics</h1>
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)


