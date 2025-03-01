import { useState } from 'react'
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  const [mostVote, setMostVote] = useState(0)

  const onNextAnecdotes = () => {
    const nextSelected = Math.floor(Math.random() * (anecdotes.length - 1))
    console.log("select ", nextSelected)
    setSelected(nextSelected)
  }

  const onVote = () => {
    const nextVote = [...vote]
    nextVote[selected] += 1
    console.log("vote ", vote)
    const newMostVoteIndex = nextVote.indexOf(Math.max(...nextVote))
    setVote(nextVote)
    setMostVote(newMostVoteIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={onVote}>vote</button>
      <button onClick={onNextAnecdotes}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVote]}</p>
    </div>
  )
}

export default App