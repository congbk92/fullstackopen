import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}> {text} </button>
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.all} />
        <StatisticLine text='average' value={props.average} />
        <StatisticLine text='positive' value={props.positivePercentage + " %"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positivePercentage, setPositivePercentage] = useState(0)

  const handleGoodClick = () => {
    const nextGood = good + 1
    const nextAll = all + 1
    setGood(nextGood)
    setAll(nextAll)
    setAverage((nextGood - bad)/nextAll)
    setPositivePercentage((nextGood/nextAll)*100)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    const nextAll = all + 1
    setAll(nextAll)
    setAverage((good - bad)/nextAll)
    setPositivePercentage((good/nextAll)*100)
  }

  const handleBadClick = () => {
    const nextAll = all + 1
    const nextBad = bad + 1
    setBad(nextBad)
    setAll(nextAll)
    setAverage((good - nextBad)/nextAll)
    setPositivePercentage((good/nextAll)*100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positivePercentage={positivePercentage}/>
    </div>
  )
}

export default App