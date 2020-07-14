import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.good !== 0 || props.neutral !== 0 || props.bad !== 0) {
    return(
      <div>
        <StatisticLine text="good" value={props.good}></StatisticLine>
        <StatisticLine text="neutral" value={props.neutral}></StatisticLine> 
        <StatisticLine text="bad" value={props.bad}></StatisticLine> 
        <StatisticLine text="all" value={props.good + props.neutral + props.bad}></StatisticLine>        
        <StatisticLine text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)}></StatisticLine>
        <StatisticLine text="positive" value={(props.good / (props.good + props.neutral + props.bad) * 100)+"%"}></StatisticLine>
      </div>
    )
  } else {
    return(
      <p>No feedback given</p>
    )
  }
}

const StatisticLine = (props) => {
  return(
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)